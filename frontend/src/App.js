import logo from "./logo.svg";
import "./App.css";
import TopBar from "./components/header/TopBar";
import PageFooter from "./components/footer/PageFooter";
import CardLayout from "./components/body/CardLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import AddCuisine from "./components/cuisine/AddCuisine";

function App() {

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <TopBar />
      <Routes>
      <Route
          path="/"
          element={<CardLayout cuisineStyle={"AllRecipe"} />}
        />
        <Route
          path="/"
          element={<CardLayout />}
          state={{
            cuisineStyle: "AllRecipe",
          }}
        />
         <Route
          path="/home"
          element={<CardLayout />}
    
        />
        <Route path="/addCuisine" element={<AddCuisine data={{
                cuisineName: "",
                cuisineType: "",
                description: "",
                cookingDuration: "",
                noOfServing: "",
                images: "",
              }}
              method="post"/>}></Route>
      </Routes>

      <PageFooter />
      {/* </header> */}
    </div>
  );
}

export default App;
