import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: { selectedUnit: { section: 0, unit: 0 }, selectedUnitName: "", courseName: "", curriculum: [], contentType: "", contentBody: "", nextUnit: { section: 0, unit: 1, unitName: "" } },
  reducers: {
    setSelectedUnit(state, actions) {
      state.selectedUnit = actions.payload;

      const selectedSection = actions.payload.section;
      const selectedUnit = actions.payload.unit;
      let unit = state.curriculum[selectedSection].units[selectedUnit];

      let type = unit.type;
      let body;

      if (type == "video") {
        body = unit.video.url;
      } else if (type == "audio") {
        body = unit.audio.url;
      } else if (type == "note") {
        body = unit.note;
      } else if (type == "file") {
        body = unit.file.url;
      } else if (type == "visualNote") {
        body = unit.visualNote.url;
      } else if (type == "mindmap") {
        body = unit.mindmap.url;
      } else if (type == "textRichFile") {
        body = unit.textRichFile.url;
      } else if (type == "realExampleVideo") {
        body = unit.realExampleVideo.url;
      } else if (type == "realExampleDoc") {
        body = unit.realExampleDoc.url;
      } else if (type == "additionalVideo") {
        body = unit.additionalVideo.url;
      } else if (type == "additionalMaterials") {
        body = unit.additionalMaterials.url;
      }
      // if (unit.isConceptLink) {
      //   type = "video";
      //   body = unit.loId.video.url;
      // } else {
      //   if (type == "video") {
      //     body = unit.video.url;
      //   } else if (type == "audio") {
      //     body = unit.audio.url;
      //   } else if (type == "note") {
      //     body = unit.note;
      //   }
      // }
      state.contentType = type;
      state.contentBody = body;
      state.selectedUnitName = unit.name;
    },
    setCourseName(state, actions) {
      state.courseName = actions.payload;
    },
    setCurriculum(state, actions) {
      state.curriculum = actions.payload;
    },
    setNextUnit(state, actions) {
      const selectedSection = state.selectedUnit.section;
      const selectedUnit = state.selectedUnit.unit;
      const curriculum = state.curriculum;
      const unitLength = curriculum[selectedSection].units.length;
      let unit = curriculum[selectedSection].units[selectedUnit + 1];
      let nextSection, nextUnit;

      if (selectedUnit < unitLength - 1) {
        nextSection = selectedSection;
        nextUnit = selectedUnit + 1;
        unit = curriculum[nextSection].units[nextUnit];
      } else {
        nextSection = selectedSection + 1;
        nextUnit = 0;
        unit = curriculum[nextSection].units[nextUnit];
      }
      state.nextUnit = {
        section: nextSection,
        unit: nextUnit,
        unitName: unit.name,
      };
    },
    goToNextUnit(state, actions) {
      const selectedSection = state.selectedUnit.section;
      const selectedUnit = state.selectedUnit.unit;
      const curriculum = state.curriculum;
      const unitLength = curriculum[selectedSection].units.length;
      let unit = curriculum[selectedSection].units[selectedUnit + 1];

      if (selectedUnit < unitLength - 1) {
        state.selectedUnit = { section: selectedSection, unit: selectedUnit + 1 };
        unit = curriculum[selectedSection].units[selectedUnit + 1];
      } else {
        console.log("In else");
        unit = curriculum[selectedSection + 1].units[0];
        state.selectedUnit = { section: selectedSection + 1, unit: 0 };
      }
      let type = unit.type;
      let body;

      if (type == "video") {
        body = unit.video.url;
      } else if (type == "audio") {
        body = unit.audio.url;
      } else if (type == "note") {
        body = unit.note;
      } else if (type == "file") {
        body = unit.file.url;
      } else if (type == "visualNote") {
        body = unit.visualNote.url;
      } else if (type == "mindmap") {
        body = unit.mindmap.url;
      } else if (type == "textRichFile") {
        body = unit.textRichFile.url;
      } else if (type == "realExampleVideo") {
        body = unit.realExampleVideo.url;
      } else if (type == "realExampleDoc") {
        body = unit.realExampleDoc.url;
      } else if (type == "additionalVideo") {
        body = unit.additionalVideo.url;
      } else if (type == "additionalMaterials") {
        body = unit.additionalMaterials.url;
      }
      state.contentType = type;
      state.contentBody = body;
      state.selectedUnitName = unit.name;
    },
    setContent(state, actions) {
      state.contentType = actions.payload.type;
      state.contentBody = actions.payload.body;
    },
  },
});

export const courseActions = courseSlice.actions;

export default courseSlice;
