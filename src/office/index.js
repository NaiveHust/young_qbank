import {saveAs} from "file-saver";
import {PaperCreator} from "./paper-generator";
import {Packer} from "docx";

export const jsonToPaper = (jsonString) => {

  const paperCreator = new PaperCreator();
  const paper = paperCreator.create(jsonString)


  Packer.toBlob(paper).then(blob => {
    console.log(blob);
    saveAs(blob, "paper.docx");
    console.log("Document created successfully");
  });

}