import HomePage from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import Community from "./Community";
import PreservationPage from "./preservation/PreservationPage";
import PestsDiseases from "./Pests&Diseases";
import Weather from "./Weather";
import Settings from "./SettingsPage";
import Help from "./Help";
import AllVegetables from "./preservation/AllVegetables";
import FlowerVegs from "./preservation/vegetables/FlowerVegetables";
import FruitVegs from "./preservation/vegetables/FruitVegetables";
import LeafyVegs from "./preservation/vegetables/LeafyVegetables";
import RootVegs from "./preservation/vegetables/RootVegetables";
import TuberVegs from "./preservation/vegetables/TuberVegetables";
import StemVegs from "./preservation/vegetables/StemVegetables";
import Fruits from "./preservation/Fruits";
import Meat from "./preservation/Meat";
import Eggs from "./preservation/Eggs";
import Milk from "./preservation/Milk";
import Cereals from "./preservation/Cereals";
import Coffee from "./preservation/Coffee";
import Tips from "./Tips";
import CreatePost from "./CreatePost";
import CommentSection from "./CommentSection";
import Profile from "./Profile";
import MarketPage from "./Market.js copy/MarketPage";
import MarketForm from "./Market.js copy/MarketForm";
import SelectedMarket from "./Market.js copy/SelectedMarket";
import MarketCustomersForm from "./Market.js copy/MarketCustomersForm";
import MarketCustomersInfo from "./Market.js copy/MarketCustomerInfo";

const screens = [
  { name: "Home", component: HomePage, protected: true }, // Add the Home screen to the list of screens  { name: "Profile", component: Profile,  protected: true },
  { name: "Login", component: Login, protected: false },
  { name: "SignUp", component: SignUp, protected: false },
  { name: "Preservation Page", component: PreservationPage, protected: true },
  { name: "PestsDiseases", component: PestsDiseases, protected: true },
  { name: "Weather", component: Weather, protected: true },
  { name: "Community", component: Community, protected: true },
  { name: "Settings", component: Settings, protected: true },
  { name: "Help", component: Help, protected: true },
  { name: "Vegetables", component: AllVegetables, protected: true },
  { name: "FlowerVegs", component: FlowerVegs, protected: true },
  { name: "FruitVegs", component: FruitVegs, protected: true },
  { name: "LeafyVegs", component: LeafyVegs, protected: true },
  { name: "RootVegs", component: RootVegs, protected: true },
  { name: "TuberVegs", component: TuberVegs, protected: true },
  { name: "StemVegs", component: StemVegs, protected: true },
  { name: "Fruits", component: Fruits, protected: true },
  { name: "Meat", component: Meat, protected: true },
  { name: "Eggs", component: Eggs, protected: true },
  { name: "Milk", component: Milk, protected: true },
  { name: "Cereals", component: Cereals, protected: true },
  { name: "Coffee", component: Coffee, protected: true },
  { name: "Tips", component: Tips, protected: true },
  { name: "CreatePost", component: CreatePost, protected: true },
  { name: "CommentSection", component: CommentSection, protected: true },
  { name: "Profile", component: Profile, protected: true },
  { name: "MarketPage", component: MarketPage, protected: true },
  { name: "MarketForm", component: MarketForm, protected: true },
  { name: "SelectedMarket", component: SelectedMarket, protected: true },
  {
    name: "MarketCustomersInfo",
    component: MarketCustomersInfo,
    protected: true,
  },
  {
    name: "MarketCustomersForm",
    component: MarketCustomersForm,
    protected: true,
  },
];

export default screens;
