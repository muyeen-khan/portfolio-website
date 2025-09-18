import { useEffect } from 'react';
import "../styles/animated.css"

function AnimatedBox({ children }) {



    useEffect(() => {
        const skillElements = document.querySelectorAll('.skill-item');
        let currentIndex = 0;

        const highlightNext = () => {
            // Remove highlight from current
            skillElements.forEach(el => el.classList.remove('animated'));

            // Add highlight to next
            skillElements[currentIndex].classList.add('animated');

            // Move to next index
            currentIndex = (currentIndex + 1) % skillElements.length;
        };

        // Start cycling every 1.5 seconds
        const interval = setInterval(highlightNext, 5000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);










    return (<div className="animated skill-item">{children}</div>)
}

export default AnimatedBox;