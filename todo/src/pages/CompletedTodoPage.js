import CompletedTodo from "../features/todo/components/completedTodo";
import Footer from "../features/ui/Footer";
import NavBar from "../features/ui/NavBar";

function CompletedTodoPage() {
    return (
        <div>
            <NavBar></NavBar>
            <CompletedTodo></CompletedTodo>
            <Footer></Footer>
        </div>
    );
}

export default CompletedTodoPage;