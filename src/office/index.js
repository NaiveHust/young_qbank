/*
 * @Author: 张奥运
 * @Date: 2021-07-04 17:40:20
 * @LastEditTime: 2021-07-06 19:41:17
 * @LastEditors: 张奥运
 * @Description: 
 */


import { saveAs } from "file-saver";
import { PaperCreator } from "./paper-generator";
import { Packer } from "docx";

export const jsonToPaper = (jsonString) => {

  const paperCreator = new PaperCreator();
  const paper = paperCreator.create(jsonString)

  Packer.toBlob(paper).then(blob => {
    console.log(paper);
    let paperObj = JSON.parse(jsonString)
    saveAs(blob, paperObj.Info.name + ".docx");
    console.log("Document created successfully");
  });

}