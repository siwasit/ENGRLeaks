import AuthenticationSection from '@/components/authentication_section';
import './style.css';
import Particle from '@/components/particle';
import ParticlesComponent from '@/components/particle';

export default function Authenticate() {
    return (
        <><div>
            <div className="container">
                <div className="nebula-img-container">
                    <img
                        src="https://freenaturestock.com/wp-content/uploads/freenaturestock-1719-1024x683.jpg"
                        alt=""
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
