import {AfterResponseHook, FetchHooks} from "fetch-hooks-ts";

// Basic error handling hook
const afterResponseHook: AfterResponseHook = (response, requestInfo, requestInit) => {
    if (!response.ok) {
        if (response.statusText) {
            throw new Error(response.statusText);
        } else {
            throw new Error("Unknown fetch error");
        }
    }

    return response;
};

// Yes, it says no hooks, and it has a hook, but it's just an error handling one :)
export const fetchNoHooks = new FetchHooks({
    afterResponseHook: afterResponseHook
});
