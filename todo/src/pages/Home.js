import Todo from "../features/todo/components/todo";
import Footer from "../features/ui/Footer";
import NavBar from "../features/ui/NavBar";

function Home(userDetails) {
    const user = userDetails.user;

    return (
        <div>
            <NavBar></NavBar>

            <div className="w-full pl-5 md:pl-40 mb-2 font-semibold">
                <img className="rounded-xl" src={user.picture} alt="profile image" />
                <div>{user.name}</div>
            </div>

            <Todo></Todo>
            <Footer></Footer>
        </div>
    );
}

export default Home;