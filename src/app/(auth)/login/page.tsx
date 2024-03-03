import { handleGithubLogin } from "@/lib/serveraction";
const LoginPage = async () => {
    return (
        <div className="min-h-screen">
            <form action={handleGithubLogin}>
                <button>Login with Github</button>
            </form>
        </div>
    );
};

export default LoginPage;
