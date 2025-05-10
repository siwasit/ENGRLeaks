import AuthenticationSection from '@/components/authentication_section';
import './style.css';
import ParticlesComponent from '@/components/particle';
import Image from 'next/image';

export default function Authenticate() {
    return (
        <><div>
            <div className="container">
                <div className="nebula-img-container">
                    <Image
                        src="/images/maple.jpg"
                        alt=""
                        height={100}
                        width={200}
                    />
                    {/* Added position: relative here */}
                    <div className="z-[-10] relative w-[200px] h-[300px] overflow-hidden">
                        <ParticlesComponent />
                    </div>


                </div>
                <div className="wrapper">
                    <AuthenticationSection/>

                </div>
            </div>
        </div></>

    );
}
