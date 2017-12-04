import { STRUCTURE_TYPE } from "../common/app-const";

function StructureStore() {
  this.structures = [];
}

StructureStore.prototype.addStructure = function(type) {
  const structure = { type };
  this.structures.push(structure);

  return structure;
};

StructureStore.prototype.hasStructureType = function(structureType) {
  return this.getStructuresByType(structureType).length > 0;
};

StructureStore.prototype.getStructures = function() {
  return this.structures;
};

StructureStore.prototype.getStructureCount = function() {
  return this.getStructures().length;
};

StructureStore.prototype.getStructuresByType = function(structureType) {
  return this.getStructures().filter(s => s.type === structureType);
};

StructureStore.prototype.getStructureCountByType = function(structureType) {
  return this.getStructuresByType(structureType).length;
};

StructureStore.prototype.getDryingHuts = function() {
  return this.getStructuresByType(STRUCTURE_TYPE.DRYING_HUT);
};

StructureStore.prototype.getDryingHutCount = function() {
  return this.getDryingHuts().length;
};

StructureStore.prototype.getCisterns = function() {
  return this.getStructuresByType(STRUCTURE_TYPE.CISTERN);
};

StructureStore.prototype.getCisternCount = function() {
  return this.getCisterns().length;
};

StructureStore.prototype.getWoodsheds = function() {
  return this.getStructuresByType(STRUCTURE_TYPE.WOODSHED);
};

StructureStore.prototype.getWoodshedCount = function() {
  return this.getWoodsheds().length;
};

StructureStore.prototype.getQuarries = function() {
  return this.getStructuresByType(STRUCTURE_TYPE.QUARRY);
};

StructureStore.prototype.getQuarryCount = function() {
  return this.getQuarries().length;
};

StructureStore.prototype.getMines = function() {
  return this.getStructuresByType(STRUCTURE_TYPE.MINE);
};

StructureStore.prototype.getMineCount = function() {
  return this.getMines().length;
};

export default StructureStore;
