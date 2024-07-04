import NavBar from '../features/ui/NavBar';
import UserProfile from '../features/user/components/UserProfile';

function UserProfilePage() {
    return (
        <div>
            <NavBar>
                <UserProfile></UserProfile>
            </NavBar>
        </div>
    );
}

export default UserProfilePage;
