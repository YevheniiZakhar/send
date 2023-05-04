import { useNavigate } from "react-router-dom";

export function useHandleSignIn(setState) {
    const navigate = useNavigate();
  
    return React.useCallback(
      async function (event) {
        try {
          const method = event.currentTarget.dataset.method;
          //const credential = await signIn({ method });
        //   if (credential.user) {
        //     setState((prev) => (prev.error ? { ...prev, error: null } : prev));
        //     navigate("/");
        //   }
        } catch (err) {
        //   const error = (err as Error)?.message ?? "Login failed.";
        //   setState((prev) => ({ ...prev, error }));
        }
      },
      [navigate, setState],
    );
  }