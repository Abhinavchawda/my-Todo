import Todo from "../features/todo/components/todo";
import Footer from "../features/ui/Footer";
import NavBar from "../features/ui/NavBar";

function Home() {
    return (
        <div>
            <NavBar></NavBar>
            <Todo></Todo>
            <Footer></Footer>
        </div>
    );
}

export default Home;