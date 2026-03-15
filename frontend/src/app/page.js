import Assignments from "@/components/Assignments"
import TextForm from "@/components/TextForm"
import Assignment from "@/models/assignment"


const Home = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Assignments />
    </div>
  )
}

export default Home