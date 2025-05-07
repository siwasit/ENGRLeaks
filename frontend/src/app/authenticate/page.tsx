//autenticate/page.tsx
import AuthenticationSection from '@/components/authentication_section';
import './style.css';

export default function Authenticate() {
    return (
        <><div>
            <div className="container">
                <div className="nebula-img-container">
                    <img
                        src="https://freenaturestock.com/wp-content/uploads/freenaturestock-1719-1024x683.jpg"
                        alt=""
                    />
                </div>
                <div className="wrapper">
                    <AuthenticationSection></AuthenticationSection>

                </div>
            </div>
        </div></>

    );
}
