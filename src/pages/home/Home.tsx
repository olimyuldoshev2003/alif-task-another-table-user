import AddUserModal from "../../components/addUserModal/AddUserModal";
import TableUsers from "../../components/tableUsers/TableUsers";

const Home = () => {
  return (
    <>
      <div className="home_component max-w-[1440px] mx-auto px-7">
        <AddUserModal />
        <TableUsers />
      </div>
    </>
  );
};

export default Home;
