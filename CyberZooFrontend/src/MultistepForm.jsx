import React, { useState } from 'react';

export function useMultistepForm(formConfigs, resetStep) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const steps = formConfigs.map(({ component: Component, props }, index) => <Component key={index} {...props} />);
    function next() {
        setCurrentStepIndex(i => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    function back() {
        resetStep(currentStepIndex)
        setCurrentStepIndex(i => {
            if (i <= 0) return i;
            return i - 1;
        });
    }

    function goTo(index) {
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length-1,
        goTo,
        next,
        back,
    };
}
