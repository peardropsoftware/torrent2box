import {DirectiveHook} from "vue";

export const focusDirective: DirectiveHook = (el: HTMLElement, binding, vnode, prevVNode) => {
    // console.log("inserted: focusDirective");
    if (el.tagName === "FORM") {
        // Focus the first input element
        const inputEl: Element | null = el.querySelector("input:first-of-type, textarea");
        if (inputEl) {
            (inputEl as HTMLElement).focus();
        }
    }
};
