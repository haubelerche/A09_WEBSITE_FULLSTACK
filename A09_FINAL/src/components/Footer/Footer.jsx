import React, { useState } from "react";
import logo from "../../images/logo.png";
import "./footer.scss";
const Footer = () => {
    const [emailBody, setEmailBody] = useState("");

    const handleSendFeedback = () => {
        const recipient = "dramaqueen0v0@gmail.com";
        const subject = "Feedback for A09";
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(
            subject
        )}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
    };

    return (
        <footer className="footer">
            <div className="footerContent">

                <img className="logo" src={logo} alt="logo" style={{width: "200px", height: "200px"}}/>

                <div className="footerAbout">
                    <h3>About A09</h3>
                    <p>
                        A09 is a non-profit coding project by Group 09 of D22FINTECH - PTIT, created for cinephiles.
                        We make your dream of an imaginary world come true. No matter where you are, we’ll be there for
                        you.
                        No promising but we hope A09 will be your escape.
                    </p>
                </div>


                <div className="footerFeedback">
                    <h3>Contact Us</h3>
                    <p>Have feedback? Hãy cho chúng tôi biết ngay :)</p>
                    <textarea
                        className="feedbackInput"
                        placeholder="Write your feedback here..."
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                    />
                    <button className="feedbackButton" onClick={handleSendFeedback}>
                        Send Feedback
                    </button>
                </div>
            </div>


            <div className="footerBottom">
                <p>&copy; {new Date().getFullYear()} Everything above does not belong to us.</p>
            </div>
        </footer>
    );
};

export default Footer;