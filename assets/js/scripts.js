import { startSlick } from "./carousel";
import * as getter from "./getters";
import { $id } from "./utils";

$(document).ready(function(){
  
  startSlick();
  getter.getLibrary();

});