import { startSlick } from "./carousel";
import * as getter from "./getters";
import { setModalListeners } from "./modal";

$(document).ready(function(){
  
  startSlick();
  getter.getMovies();
  getter.getSeries();
  setModalListeners();

});