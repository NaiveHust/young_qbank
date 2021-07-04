import {AlignmentType, Document, HeadingLevel, Paragraph, TabStopPosition, TabStopType, TextRun} from "docx";

export class PaperCreator {
  public create(jsonStr): Document {
    let number = 0;
    let paperObj = JSON.parse(jsonStr)
    let single = paperObj.Single
    let singleTopic = single.topic
    let multiple = paperObj.Multiple
    let multipleTopic = multiple.topic
    let trueOrFalse = paperObj.Truefalse
    let trueOrFalseTopic = trueOrFalse.topic

    let fillTopic = paperObj.Fill.topic
    let answerTopic = paperObj.Answer.topic
    console.log(...singleTopic)

    const paper = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: paperObj.Info.name,
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: "单选题",
              heading: HeadingLevel.HEADING_1,
            }),
            ...singleTopic
              .map(topic => {
                const arr: Paragraph[] = [];
                arr.push(
                  // 小题空一行
                  new Paragraph({
                    text: " "
                  }),
                );
                arr.push(
                  new Paragraph({
                    text: `第 ${++number} 题 `+ topic.question + "\n",
                    heading: HeadingLevel.HEADING_2,
                  })
                )
                // 每个单选题的选项
                arr.push(
                  ...topic.choice
                    .map(c => {
                      let array: Paragraph[] = []
                      array.push(
                        new Paragraph({
                          text: c.name + ". " + c.content,
                        })
                      )

                      return array
                    })
                    .reduce((prev, curr) => prev.concat(curr), []),
                )

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            // 大题空两行
            new Paragraph({
              text: " "
            }),
            new Paragraph({
              text: " "
            }),
            new Paragraph({
              text: "多选题",
              heading: HeadingLevel.HEADING_1
            }),
            ...multipleTopic
              .map(topic => {
                const arr: Paragraph[] = [];
                arr.push(
                  // 小题空一行
                  new Paragraph({
                    text: " "
                  }),
                )
                arr.push(
                  new Paragraph({
                    text: `第 ${++number} 题 `+ topic.question + "\n",
                    heading: HeadingLevel.HEADING_2,
                  })
                )
                // 每个多选题的选项
                arr.push(
                  ...topic.choice
                    .map(c => {
                      let array: Paragraph[] = []
                      array.push(
                        new Paragraph({
                          text: c.name + ". " + c.content,
                        })
                      )

                      return array
                    })
                    .reduce((prev, curr) => prev.concat(curr), []),
                )

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            // 大题空两行
            new Paragraph({
              text: " "
            }),
            new Paragraph({
              text: " "
            }),
            new Paragraph({
              text: "判断题",
              heading: HeadingLevel.HEADING_1
            }),
            ...trueOrFalseTopic
              .map(topic => {
                const arr: Paragraph[] = [];
                arr.push(
                  // 小题空一行
                  new Paragraph({
                    text: " "
                  }),
                )
                arr.push(
                  new Paragraph({
                    text: `第 ${++number} 题 `+ topic.question + "\n",
                    heading: HeadingLevel.HEADING_2,
                  })
                )

                return arr
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            // 大题空两行
            new Paragraph({
              text: " "
            }),
            new Paragraph({
              text: " "
            }),
            new Paragraph({
              text: "填空题",
              heading: HeadingLevel.HEADING_1,
            }),
            ...fillTopic
              .map(topic => {

                const arr: Paragraph[] = [];
                arr.push(
                  // 小题空一行
                  new Paragraph({
                    text: " "
                  }),
                )
                arr.push(
                  new Paragraph({
                    text: `第 ${++number} 题 `,
                    heading: HeadingLevel.HEADING_2,
                  })
                )
                // 每个填空题的每一空
                arr.push(
                  ...topic.question
                    .map(q => {
                      let array: Paragraph[] = []
                      array.push(
                        new Paragraph({
                          text: q.head + "____" + q.tail
                        })
                      )

                      return array
                    })
                    .reduce((prev, curr) => prev.concat(curr), []),
                )

                return arr;
              }).reduce((prev, curr) => prev.concat(curr), []),
            // 大题空两行
            new Paragraph({
              text: " "
            }),
            new Paragraph({
              text: " "
            }),
            new Paragraph({
              text: "简答题",
              heading: HeadingLevel.HEADING_1
            }),
            ...answerTopic
              .map(topic => {
                const arr: Paragraph[] = [];
                arr.push(
                  // 小题空一行
                  new Paragraph({
                    text: " "
                  }),
                )
                arr.push(
                  new Paragraph({
                    text: `第 ${++number} 题 `+ topic.question + "\n",
                    heading: HeadingLevel.HEADING_2,
                  })
                )
                // 每个简答题的每一问
                arr.push(
                  ...topic.subQ
                    .map(s => {
                      let array: Paragraph[] = []
                      array.push(
                        new Paragraph({
                          text: s.content,
                        })
                      )

                      return array
                    })
                    .reduce((prev, curr) => prev.concat(curr), []),
                )

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),
          ]
        },
      ]
    })

    for (let i = 0; i < paperObj.Single.topic.length; i++) {
      console.log(paperObj.Single.topic[i])
    }
    console.log("OK")
    return paper;
  }

}
