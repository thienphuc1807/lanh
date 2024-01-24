import { handleGithubLogin } from "@/lib/serveraction";

const LoginPage = async () => {
    // const session = await auth();
    // console.log(session);

    return (
        <div className="min-h-screen pt-[500px]">
            <form action={handleGithubLogin}>
                <button>Login with Github</button>
            </form>
        </div>
    );
};

export default LoginPage;
