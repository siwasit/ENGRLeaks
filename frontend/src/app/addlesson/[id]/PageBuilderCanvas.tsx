'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import RunTimeIDE from "@/templates/runtimeIDE";
import RunTimeExercise from "@/templates/runtimeIDETest";
import CourseHeader from '@/templates/courseHeader';
import Paragraph from '@/templates/paragraph';
import CourseImageProps from '@/templates/image_component';
import MultipleChoiceExercise from '@/templates/multipleChoiceExercise';
import Footer from '@/components/footer';
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { oneDark } from "@codemirror/theme-one-dark";
import { useParams, useRouter } from "next/navigation";
import {
    Code,
    Image,
    List,
    Plus,
    X,
} from 'lucide-react';

// Import the specific icons correctly:
import {
    Heading1 as H1Icon,
    // P as PIcon, // Removed as 'P' is not exported by 'lucide-react'
} from 'lucide-react';
import addLesson from '@/utils/addLesson';


// ===============================
// Types & Interfaces
// ===============================

type ComponentType =
    | 'CourseHeader'
    // | 'Header2'
    | 'Paragraph'
    | 'IDERuntimeTutorial'
    | 'IDERuntimeExercise'
    | 'Image'
    | 'ExerciseChoice'
    | 'Text';

interface BaseComponent {
    id: string;
    type: ComponentType;
    content: string; // Could be text, URL, or code snippet
    initialCode?: string; // For IDE components
    style?: React.CSSProperties; //  Keeping this for any style overrides
    title?: string;
    lecturer?: string;
    instructions?: string;
    expectedOutput?: string;
    onUpdate?: (updated: { title: string; teacher_name: string }) => void;
}

interface EditableCourseHeaderProps {
    id: string;
    type: string;
    content: string;
    title: string;
    lecturer: string;
    onUpdate?: (updated: { title: string; teacher_name: string }) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function EditableCourseHeader({
    title,
    lecturer,
    onChange,
}: EditableCourseHeaderProps) {
    return (
        <div className="mb-8">
            <input
                type="text"
                name="title"
                value={title}
                onChange={onChange}
                placeholder="Course Title"
                className="text-[50px] font-bold text-[#C5211C] bg-transparent focus:outline-none w-full"
            />
            <hr className="border-[#851515] my-1 border-2" />
            <div className="flex gap-2 text-neutral-600 text-[24px] items-center">
                <p className="font-medium">Author:</p>
                <input
                    type="text"
                    name="lecturer"
                    value={lecturer}
                    onChange={onChange}
                    placeholder="Lecturer Name"
                    className="bg-transparent focus:outline-none text-[24px]"
                />
            </div>
        </div>
    );
}

export function EditableParagraph({
    content,
    title,
    onChange,
}: EditableCourseHeaderProps) {
    return (
        <div className="mb-8">
            <input
                type="text"
                name="title"
                value={title}
                onChange={onChange}
                placeholder="Paragraph Title..."
                className="text-[30px] font-bold text-[#C5211C] bg-transparent focus:outline-none w-full"
            />
            <hr className="border-[#000000] border-[1.2px] my-1" />
            <div className="flex gap-2 text-neut ral-600 text-[20px] items-center">
                <textarea
                    name="content"
                    value={content}
                    onChange={onChange}
                    placeholder="Content..."
                    className="bg-transparent focus:outline-none text-[20px] w-full "
                />
            </div>
        </div>
    );
}

interface ImageComponent extends BaseComponent {
    type: 'Image';
    src: string; // URL of the image 
    alt: string; // Alt text for accessibility
    width?: number;
    height?: number;
}

interface ChoiceOption {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface ExerciseChoiceComponent extends BaseComponent {
    type: 'ExerciseChoice';
    question: string;
    choices: string[];
    options: ChoiceOption[];
    correctChoice?: number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

type ComponentData = BaseComponent | ImageComponent | ExerciseChoiceComponent;

// ===============================
// Constants
// ===============================

const COMPONENT_LIBRARY: Array<{ type: ComponentType; name: string; icon: React.FC }> = [
    { type: 'CourseHeader', name: 'Course Header', icon: H1Icon }, // Use the correctly imported icon
    // { type: 'Header2', name: 'Header 2', icon: H2Icon }, // Use the correctly imported icon
    { type: 'Paragraph', name: 'Paragraph', icon: List },     // Replaced with a valid icon
    { type: 'IDERuntimeTutorial', name: 'Tutorial', icon: Code },
    { type: 'IDERuntimeExercise', name: 'Exercise', icon: Code },
    { type: 'Image', name: 'Image', icon: Image },
    { type: 'ExerciseChoice', name: 'Choice Exercise', icon: List },
];

// ===============================
// Helper Functions
// ===============================

const createComponent = (type: ComponentType, id?: string): ComponentData => {
    const base: Omit<BaseComponent, 'id'> = {
        type,
        content: type === 'Paragraph' ? 'Default Paragraph Content' : `Default Content for ${type}`, // Ensure Paragraph has default content
        style: {},
    };

    const newId = id || crypto.randomUUID();

    switch (type) {
        case 'CourseHeader':
            return {
                ...base,
                id: newId,
                type: 'CourseHeader',
                title: '',
                lecturer: '',
            };
        case 'IDERuntimeTutorial':
            return {
                ...base,
                id: newId,
                type: 'IDERuntimeTutorial',
                title: '',
            };
        case 'IDERuntimeExercise':
            return {
                ...base,
                id: newId,
                type: 'IDERuntimeExercise',
                initialCode: '',
                title: '',
                instructions: '',
                expectedOutput: '',
            };
        case 'Paragraph':
            return {
                ...base,
                id: newId,
                type: 'Paragraph',
                title: '',
                lecturer: '',
                content: '',
            };
        case 'Image':
            return {
                ...base,
                id: newId,
                type: 'Image',
                src: 'https://placehold.co/600x400?text=Image',
                alt: 'Placeholder Image',
                width: 600,
                height: 400,
            };
        case 'ExerciseChoice':
            return {
                ...base,
                id: newId,
                type: 'ExerciseChoice',
                question: 'What is the answer?',
                options: [
                    { id: crypto.randomUUID(), text: 'Option 1', isCorrect: false },
                    { id: crypto.randomUUID(), text: 'Option 2', isCorrect: true },
                    { id: crypto.randomUUID(), text: 'Option 3', isCorrect: false },
                ],
            };
        default:
            return { ...base, id: newId };
    }
};

// ===============================
// Sub-Components
// ===============================

const DraggableComponent: React.FC<{
    component: typeof COMPONENT_LIBRARY[number];
    onAddComponent: (type: ComponentType) => void;
}> = ({ component, onAddComponent }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }} // Ensure motion.div is used correctly
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white/10 p-3 rounded-lg shadow-md cursor-grab hover:bg-red-400 transition-colors flex items-center gap-2"
            onClick={() => onAddComponent(component.type)}
        >
            {/* <component.icon className="w-5 h-5 text-blue-400" /> */}
            <component.icon />
            <span className="text-sm font-medium text-red">{component.name}</span>
        </motion.div>
    );
};

const RenderComponent: React.FC<{
    component: ComponentData;
    onUpdateComponent: (id: string, updates: Partial<ComponentData>) => void;
    onDeleteComponent: (id: string) => void;
    isEditMode: boolean;
}> = ({ component, onUpdateComponent, onDeleteComponent, isEditMode }) => {
    const [localComponent, setLocalComponent] = useState<ComponentData>(component);
    const inputRef = useRef<HTMLInputElement | null>(null);
    // const textareaRef = useRef<HTMLTextAreaElement | null>(null);


    useEffect(() => {
        setLocalComponent(component);
    }, [component]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;

        const updatedComponent = {
            ...localComponent,
            [name]: parsedValue,
        };

        setLocalComponent(updatedComponent);
        onUpdateComponent(localComponent.id, { [name]: parsedValue });
    };



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target) {
                    const src = event.target.result as string;
                    if (localComponent.type === 'Image') {
                        setLocalComponent({ ...localComponent, src });
                    }
                    onUpdateComponent(localComponent.id, { src });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleOptionChange = (optionId: string, field: keyof ChoiceOption, value: string | boolean) => {
        if (localComponent.type === 'ExerciseChoice') {
            const newOptions = (localComponent as ExerciseChoiceComponent).options.map((option) =>
                option.id === optionId ? { ...option, [field]: value } : option
            );
            setLocalComponent({ ...localComponent, options: newOptions });
            onUpdateComponent(localComponent.id, { options: newOptions });
        }
    };

    const addOption = () => {
        if (localComponent.type === 'ExerciseChoice') {
            // Type narrows to ExerciseChoiceComponent
            const exerciseChoiceComponent = localComponent as ExerciseChoiceComponent;

            const newOption = { id: crypto.randomUUID(), text: '', isCorrect: false };
            const newOptions = [...exerciseChoiceComponent.options, newOption];
            setLocalComponent({ ...exerciseChoiceComponent, options: newOptions });
            onUpdateComponent(exerciseChoiceComponent.id, { options: newOptions });
        }
    };


    const deleteOption = (optionId: string) => {
        if (localComponent.type === 'ExerciseChoice') {
            const exerciseComponent = localComponent as ExerciseChoiceComponent;
            const newOptions = exerciseComponent.options.filter((option) => option.id !== optionId);
            const updatedComponent: ExerciseChoiceComponent = { ...exerciseComponent, options: newOptions };

            setLocalComponent(updatedComponent);
            onUpdateComponent(updatedComponent.id, { options: newOptions });
        }
    };

    // Focus on input when component is first rendered in edit mode
    useEffect(() => {
        if (isEditMode && inputRef.current && localComponent.type !== 'Image' && localComponent.type !== 'ExerciseChoice') {
            inputRef.current.focus();
        }
    }, [isEditMode, localComponent]);


    if (!isEditMode) {
        switch (localComponent.type) {
            case 'CourseHeader':
                return <div>
                    <CourseHeader
                        title={localComponent.title ? localComponent.title : 'Default Title'}
                        teacher_name={localComponent.lecturer ? localComponent.lecturer : 'Default Lecturer'}
                    />
                </div>;
            // case 'Header2':
            //     return <h2 style={localComponent.style} className="text-2xl font-semibold">{localComponent.content}</h2>;
            case 'Paragraph':
                return <Paragraph title="Paragraph Title" text={localComponent.content} />;
            case 'IDERuntimeTutorial':
                return <RunTimeIDE initialCode={localComponent.initialCode || ''} title={localComponent.title || ''} />;
            case 'IDERuntimeExercise':
                return <RunTimeExercise
                    initialCode={localComponent.initialCode}
                    title={localComponent.title || ''}
                    instructions={localComponent.instructions || ''}
                    expectedOutput={localComponent.expectedOutput || ''}
                />;
            case 'Image':
                return (
                    localComponent.type === 'Image' && (
                        <CourseImageProps
                            imageUrl={(localComponent as ImageComponent).src}
                            imageDescription={(localComponent as ImageComponent).alt}
                            style={{
                                width: (localComponent as ImageComponent).width, height: (localComponent as ImageComponent).height
                            }}
                            height={(((localComponent as ImageComponent).height) || '100').toString()}
                            width={(((localComponent as ImageComponent).width) || '100').toString()}
                        />
                    )

                );
            case 'ExerciseChoice':
                return (
                    <div >
                        <MultipleChoiceExercise
                            text={(localComponent as ExerciseChoiceComponent).question}
                            options={(localComponent as ExerciseChoiceComponent).options.map((option) => option.text)}
                            correctIndex={(localComponent as ExerciseChoiceComponent).options.findIndex((option) => option.isCorrect)}
                        />
                    </div>
                );
            default:
                return <div>Component Type Not Supported</div>;
        }
    }

    // Render editable component
    return (
        <div className="relative group">
            <div className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-200 transition-opacity flex gap-1">
                <button


                    onClick={() => onDeleteComponent(localComponent.id)}
                    className="text-red-500 hover:text-red-400"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
            <div className="border-2 border-dashed border-gray-400 p-4 rounded-md bg-white/5 backdrop-blur-md">
                {localComponent.type === 'CourseHeader' && (
                    <EditableCourseHeader
                        id={localComponent.id}
                        type={localComponent.type}
                        content={localComponent.content}
                        title={localComponent.title ?? ''}
                        lecturer={localComponent.lecturer ?? ''}
                        onChange={handleInputChange}
                    />
                )}
                {localComponent.type === 'Paragraph' && (
                    // <div><textarea
                    //     ref={textareaRef}
                    //     name="content"
                    //     value={localComponent.content}
                    //     onChange={handleInputChange}
                    //     placeholder="Enter paragraph content"
                    //     className="text-base bg-transparent border-none focus-visible:ring-0 w-full resize-none"
                    //     rows={5}
                    // />
                    //     {/* <Paragraph title="Paragraph Title" text={localComponent.content} /> */}
                    // </div>
                    <div>
                        <EditableParagraph
                            id={localComponent.id}
                            type={localComponent.type}
                            content={localComponent.content}
                            title={localComponent.title ?? ''}
                            lecturer={localComponent.lecturer ?? ''}
                            onChange={handleInputChange}
                        />

                    </div>
                )}

                {localComponent.type === 'IDERuntimeTutorial' && (
                    <div>
                        <div className="my-8">
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    value={localComponent.title}
                                    onChange={(e) => {
                                        setLocalComponent({ ...localComponent, title: e.target.value });
                                        onUpdateComponent(localComponent.id, { title: e.target.value });
                                    }}
                                    placeholder="Title"
                                    className="text-[30px] font-bold text-[#C5211C] bg-transparent focus:outline-none w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center bg-[#FFEDD9] p-4 rounded-lg shadow-md">
                                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
                                    <div className="mb-4 flex items-center justify-start space-x-2">
                                        <h1 className="text-2xl font-bold text-[#851515]">HTML Runtime IDE</h1>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Code Editor */}
                                        <div className="flex flex-col">
                                            <label className="mb-2 font-semibold text-[#851515]">HTML Code</label>
                                            <CodeMirror
                                                onChange={(value) => {
                                                    setLocalComponent({ ...localComponent, initialCode: value });
                                                    onUpdateComponent(localComponent.id, { initialCode: value });
                                                }}
                                                value={localComponent.initialCode}
                                                height="256px"
                                                theme={oneDark}
                                                extensions={[html()]}
                                            />
                                        </div>

                                        {/* Output Preview */}
                                        <div className="flex flex-col">
                                            <label className="mb-2 font-semibold text-[#851515]">Output</label>
                                            <iframe
                                                className="w-full h-64 border border-[#3c3c3c] bg-white"
                                                srcDoc={localComponent.initialCode}
                                                title="Output Preview"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {localComponent.type === 'IDERuntimeExercise' && (
                    <div>
                        <div className="my-8">
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    value={localComponent.title}
                                    onChange={(e) => {
                                        setLocalComponent({
                                            ...localComponent,
                                            title: e.target.value,
                                        });
                                        onUpdateComponent(localComponent.id, {
                                            title: e.target.value,
                                        });
                                    }}
                                    placeholder="Title"
                                    className="text-[30px] font-bold text-[#C5211C] mb-2 bg-transparent focus:outline-none w-full"
                                />
                                <input
                                    type="text"
                                    name="instructions"
                                    value={localComponent.instructions}
                                    onChange={(e) => {
                                        setLocalComponent({
                                            ...localComponent,
                                            instructions: e.target.value,
                                        });
                                        onUpdateComponent(localComponent.id, {
                                            instructions: e.target.value,
                                        });
                                    }}
                                    placeholder="Instructions"
                                    className="text-base mb-4 ml-1 text-[#333] bg-transparent focus:outline-none w-full"
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center bg-[#FFEDD9] p-4 rounded-lg shadow-md">
                                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
                                    <div className="mb-4 flex items-center justify-start space-x-2">
                                        <h1 className="text-2xl font-bold text-[#851515]">HTML Runtime IDE</h1>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Code Editor */}
                                        <div className="flex flex-col">
                                            <label className="mb-2 font-semibold text-[#851515]">HTML Code</label>
                                            <CodeMirror
                                                onChange={(value) => {
                                                    setLocalComponent({ ...localComponent, initialCode: value });
                                                    onUpdateComponent(localComponent.id, { initialCode: value });
                                                }}
                                                value={localComponent.initialCode}
                                                height="256px"
                                                theme={oneDark}
                                                extensions={[html()]}
                                            />
                                        </div>

                                        {/* Output Preview */}
                                        <div className="flex flex-col">
                                            <label className="mb-2 font-semibold text-[#851515]">Output</label>
                                            <iframe
                                                className="w-full h-64 border border-[#3c3c3c] bg-white"
                                                srcDoc={localComponent.initialCode}
                                                title="Output Preview"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <input
                                type="text"
                                name="expectedOutput"
                                value={localComponent.expectedOutput}
                                onChange={(e) => {
                                    setLocalComponent({
                                        ...localComponent,
                                        expectedOutput: e.target.value,
                                    });
                                    onUpdateComponent(localComponent.id, {
                                        expectedOutput: e.target.value,
                                    });
                                }}
                                placeholder="Expected Output"
                                className="text-base mt-4 ml-1 text-[#333] bg-transparent focus:outline-none w-full"
                            />
                        </div>
                    </div>

                )}
                {localComponent.type === 'Image' && (() => {
                    const imageComponent = localComponent as ImageComponent;
                    return (
                        <div className="space-y-4">
                            <CourseImageProps
                                imageUrl={imageComponent.src}
                                imageDescription={imageComponent.alt}
                                style={{
                                    width: imageComponent.width, height: imageComponent.height
                                }}
                                height={imageComponent.height?.toString() || '100'}
                                width={imageComponent.width?.toString() || '100'}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="text-sm"
                            />
                            <input
                                type="text"
                                name="alt"
                                value={imageComponent.alt}
                                onChange={handleInputChange}
                                placeholder="Image Alt Text"
                                className="text-sm w-full"
                            />
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    name="width"
                                    value={imageComponent.width || ''}
                                    onChange={handleInputChange}
                                    placeholder="Width"
                                    className="text-sm w-24"
                                />
                                <input
                                    type="number"
                                    name="height"
                                    value={imageComponent.height || ''}
                                    onChange={handleInputChange}
                                    placeholder="Height"
                                    className="text-sm w-24"
                                />
                            </div>
                        </div>
                    );
                })()}

                {localComponent.type === 'ExerciseChoice' && (

                    <div className="space-y-4">
                        <input
                            type="text"
                            name="question"
                            value={(localComponent as ExerciseChoiceComponent).question}
                            onChange={handleInputChange}
                            placeholder="Enter the question"
                            className="text-lg font-semibold w-full" // Use w-full
                        />
                        <div className="space-y-2">
                            {localComponent.type === 'ExerciseChoice' && (() => {
                                const exerciseComponent = localComponent as ExerciseChoiceComponent;

                                return exerciseComponent.options.map((option) => (
                                    <div key={option.id} >
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={option.text}
                                                onChange={(e) => handleOptionChange(option.id, 'text', e.target.value)}
                                                placeholder={`Option ${exerciseComponent.options.indexOf(option) + 1}`}
                                                className="text-sm w-full"
                                            />
                                            <label className="text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={option.isCorrect}
                                                    onChange={(e) => handleOptionChange(option.id, 'isCorrect', e.target.checked)}
                                                    className="mr-1"
                                                />
                                                Correct
                                            </label>
                                            <button
                                                onClick={() => deleteOption(option.id)}
                                                className="text-red-500 hover:text-red-400"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>

                                        </div></div>


                                ));
                            })()}

                            <button // Changed to a standard button
                                onClick={addOption}
                                className="text-blue-500 hover:text-blue-400 border border-blue-500 rounded-md px-2 py-1" // Added basic styling
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Option
                            </button>

                        </div>



                    </div>



                )}
            </div>
        </div>
    );
};

// ===============================
// Main Component
// ===============================

const PageBuilderCanvas = () => {
    const params = useParams();
    const id = params?.id as string;
    // const [courseID, setCourseID] = useState(id);
    const courseID = id

    const router = useRouter();

    useEffect(() => {
        setComponents((prevComponents) => [...prevComponents]); // Ensure components are initialized
        if (!localStorage.getItem('csrf_token_initialized')) {
            getCsrfToken();
            localStorage.setItem('csrf_token_initialized', 'true');
        }
    }, []);

    const [components, setComponents] = useState<ComponentData[]>([]);
    const [isEditMode, setIsEditMode] = useState(true);
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedComponentType, setDraggedComponentType] = useState<ComponentType | null>(null);

    const onAddComponent = useCallback((type: ComponentType) => {
        const newComponent = createComponent(type);
        setComponents((prevComponents) => [...prevComponents, newComponent]);
    }, []);

    const onUpdateComponent = useCallback((id: string, updates: Partial<ComponentData>) => {
        setComponents((prevComponents) =>
            prevComponents.map((c) => (c.id === id ? { ...c, ...updates } : c))
        );
    }, []);

    const onDeleteComponent = useCallback((id: string) => {
        setComponents((prevComponents) => prevComponents.filter((c) => c.id !== id));
    }, []);

    const handleDragStart = (type: ComponentType) => {
        setIsDragging(true);
        setDraggedComponentType(type);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setDraggedComponentType(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (draggedComponentType) {
            onAddComponent(draggedComponentType);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Necessary for drop to work
    };

    if (!id || id === '0') {
        return (<><p>ID not found</p></>);
    }

    // Save and Load functions (using localStorage for simplicity)
    // const savePage = () => {
    //     try {
    //         const data = JSON.stringify(components);
    //         localStorage.setItem('pageData', data);
    //         alert('Page saved successfully!');
    //     } catch (err) {
    //         setError('Failed to save page.');
    //     }
    // };

    // const loadPage = () => {
    //     try {
    //         const data = localStorage.getItem('pageData');
    //         if (data) {
    //             const loadedComponents = JSON.parse(data);
    //             // Basic validation of loaded data
    //             if (Array.isArray(loadedComponents)) {
    //                 // Further validation of individual components can be added here
    //                 setComponents(loadedComponents);
    //             } else {
    //                 setError('Invalid data in localStorage.');
    //             }
    //         }
    //     } catch (err) {
    //         setError(`Failed to load page. ${err}`);
    //     }
    // };

    const clearPage = () => {
        setComponents([]);
        localStorage.removeItem('pageData');
    };

    const
        exportPage = async () => {
            
            try {
                
                const data = JSON.stringify(
                    components.map((component) => {
                        if (component.type === 'ExerciseChoice') {
                            const exerciseComponent = component as ExerciseChoiceComponent;
                            return {
                                ...exerciseComponent,
                                choices: exerciseComponent.options.map((option) => option.text), // Map options to choices as strings
                                correctChoice: exerciseComponent.options.findIndex((option) => option.isCorrect),
                            };
                        } else if (component.type === 'IDERuntimeTutorial') {
                            return {
                                ...component,
                                content: component.content,
                            };
                        }
                        return component;
                    }),
                    null,
                    2
                ); // Pretty print JSON

                const lessonName = prompt("Please enter the lesson name:");
                if (!lessonName) {
                    alert("Lesson name is required!");
                    return;
                }
                // await setLessonName(name);
                const status = await addLesson(courseID, lessonName, data);

                if (status === 201) {
                    alert("Lesson exported and added successfully!");
                    router.push('/dashboard');
                }

            } catch (err) {
                setError(`Failed to export and add lesson. ${err}`);
            }
        };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result;
                if (typeof content === 'string') {
                    const importedComponents = JSON.parse(content);
                    if (Array.isArray(importedComponents)) {
                        setComponents(importedComponents);
                    } else {
                        setError('Invalid file content: Expected an array of components.');
                    }
                }
            } catch {
                setError(`Error parsing file`);
            }
        };
        reader.onerror = () => {
            setError('Failed to read file.');
        };
        reader.readAsText(file);
        // Reset the input so you can import the same file again
        e.target.value = '';
    };

    function cn(...classes: (string | undefined | null | false)[]): string {
        return classes.filter(Boolean).join(' ');
    }
    return (
        <div className="min-h-screen bg-white text-red flex flex-col h-[150vh]">
            <header className="bg-[#851515] py-4 px-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                    <h1 className="text-white text-2xl font-bold">Page Builder</h1>
                    <div className="flex items-center gap-4">
                        <button

                            onClick={() => setIsEditMode(!isEditMode)}
                            className="text-white bg-orange-400 hover:bg-orange-500 hover:text-orange-100 cursor-pointer border border-gray-700 rounded-md px-4 py-2" // Added basic styling
                        >
                            {isEditMode ? 'Preview' : 'Edit'}
                        </button>
                        {/* <button onClick={savePage} className="bg-green- 500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300 rounded-md px-4 py-2">Save</button> */}
                        {/* <button onClick={loadPage} className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 rounded-md px-4 py-2">Load</button> */}
                        <button onClick={clearPage} className="bg-red-500 text-red-100 hover:bg-red-600 cursor-pointer hover:text-red-100 rounded-md px-4 py-2">Clear</button>
                        <button onClick={
                            async () => {
                                await exportPage();
                                // setModalOpen(true);
                            }
                            // exportPage
                        } className="bg-green-500 text-white hover:bg-green-300 cursor-pointer hover:text-green-100 hover:bg-green-600 rounded-md px-4 py-2">Add Lesson</button>
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            className="text-sm"
                            id="import-file"
                            style={{ display: 'none' }} // Hide the input element
                        />
                        {/* <label htmlFor="import-file">
                            <button  // Changed to a standard button
                                className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 hover:text-yellow-300 rounded-md px-4 py-2" // Added basic styling
                            >
                                <span>Import</span>
                            </button>
                        </label> */}
                    </div>
                </div>
            </header>

            <main className="flex-1 flex flex-col md:flex-row">
                {/* Sidebar */}
                {isEditMode && (
                    <aside className="w-full md:w-64 bg-red-800 py-4 pl-4 pr-2 border-r border-gray-800 space-y-4">
                        <h2 className="text-white text-lg font-semibold">Components</h2>

                        {/* Sticky Wrapper */}
                        <div className="sticky top-4">
                            <div
                                className={cn(
                                    "space-y-2 overflow-y-auto max-h-[calc(100vh-14rem)] pr-2",
                                    isDragging ? "cursor-grabbing" : "cursor-grab"
                                )}
                                onDragEnd={handleDragEnd}
                            >
                                {COMPONENT_LIBRARY.map((component) => (
                                    <div
                                        key={component.type}
                                        draggable
                                        onDragStart={() => handleDragStart(component.type)}
                                        onDragEnd={handleDragEnd}
                                        className="bg-red-300 overflow-hidden rounded-md shadow-md flex items-center gap-2"
                                    >
                                        <DraggableComponent
                                            component={component}
                                            onAddComponent={onAddComponent}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                )}

                {/* {modalOpen && (
                    <LessonNameModal
                        isOpen={modalOpen}
                        onClose={() => { setModalOpen(false); return; }}
                        onSave={ async (name) => {
                            const lessonName = prompt("Please enter the lesson name:");
                            if (!lessonName) {
                                alert("Lesson name is required!");
                                return;
                            }
                            // await setLessonName(name);
                            const status = await addLesson(courseID, lessonName, data);

                            if (status === 201) {
                                // alert("Lesson exported and added successfully!");
                                router.push('/dashboard');
                            }
                        }}
                    />
                )} */}

                {/* Canvas Area */}
                <section
                    className="flex-1 bg-white p-6"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {/* {loading && (
                        <div className="absolute inset-0 flex justify-center items-center bg-opacity-50 bg-black">
                            <div className="text-red text-lg">Loading...</div>
                        </div>
                    )} */}

                    {error && (
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 p-4 bg-red-600 text-red rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        {components.map((component) => {
                            switch (component.type) {
                                case 'CourseHeader':
                                    return (
                                        <RenderComponent
                                            key={component.id}
                                            component={component}
                                            onUpdateComponent={onUpdateComponent}
                                            onDeleteComponent={onDeleteComponent}
                                            isEditMode={isEditMode}
                                        />
                                    );
                                // case 'Header2':
                                //     return (
                                //         <RenderComponent
                                //             key={component.id}
                                //             component={component}
                                //             onUpdateComponent={onUpdateComponent}
                                //             onDeleteComponent={onDeleteComponent}
                                //             isEditMode={isEditMode}
                                //         />
                                //     );
                                case 'Paragraph':
                                    return (
                                        <RenderComponent
                                            key={component.id}
                                            component={component}
                                            onUpdateComponent={onUpdateComponent}
                                            onDeleteComponent={onDeleteComponent}
                                            isEditMode={isEditMode}
                                        />
                                    );
                                case 'Image':
                                    return (
                                        <RenderComponent
                                            key={component.id}
                                            component={component}
                                            onUpdateComponent={onUpdateComponent}
                                            onDeleteComponent={onDeleteComponent}
                                            isEditMode={isEditMode}
                                        />
                                    );
                                case 'IDERuntimeTutorial':
                                    return (
                                        <RenderComponent
                                            key={component.id}
                                            component={component}
                                            onUpdateComponent={onUpdateComponent}
                                            onDeleteComponent={onDeleteComponent}
                                            isEditMode={isEditMode}
                                        />
                                    );
                                case 'IDERuntimeExercise':
                                    return (
                                        <RenderComponent
                                            key={component.id}
                                            component={component}
                                            onUpdateComponent={onUpdateComponent}
                                            onDeleteComponent={onDeleteComponent}
                                            isEditMode={isEditMode}
                                        />
                                    );
                                case 'ExerciseChoice':
                                    return (
                                        <RenderComponent
                                            key={component.id}
                                            component={component}
                                            onUpdateComponent={onUpdateComponent}
                                            onDeleteComponent={onDeleteComponent}
                                            isEditMode={isEditMode}
                                        />
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PageBuilderCanvas;

function getCsrfToken() {
    throw new Error('Function not implemented.');
}

