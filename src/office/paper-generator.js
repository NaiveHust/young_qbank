"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.PaperCreator = void 0;
var docx_1 = require("docx");
var PaperCreator = /** @class */ (function () {
    function PaperCreator() {
    }
    PaperCreator.prototype.create = function (jsonStr) {
        var number = 0;
        var numberAnswer = 0;
        var paperObj = JSON.parse(jsonStr);
        var single = paperObj.Single;
        var singleTopic = single.topic;
        var multiple = paperObj.Multiple;
        var multipleTopic = multiple.topic;
        var trueOrFalse = paperObj.Truefalse;
        var trueOrFalseTopic = trueOrFalse.topic;
        var fillTopic = paperObj.Fill.topic;
        var answerTopic = paperObj.Answer.topic;
        console.log.apply(console, singleTopic);
        var paper = new docx_1.Document({
            sections: [
                {
                    children: __spreadArrays([
                        new docx_1.Paragraph({
                            text: paperObj.Info.name,
                            heading: docx_1.HeadingLevel.TITLE,
                            alignment: docx_1.AlignmentType.CENTER
                        }),
                        new docx_1.Paragraph({
                            text: "满分：" + paperObj.Info.score + "考试时长：" + paperObj.Info.duration,
                            alignment: docx_1.AlignmentType.CENTER
                        }),
                        new docx_1.Paragraph({
                            text: "姓名：________" + "班级：__________" + "学号：__________",
                            alignment: docx_1.AlignmentType.CENTER
                        }),
                        new docx_1.Paragraph({
                            text: ""
                        }),
                        new docx_1.Paragraph({
                            text: "单选题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ], singleTopic
                        .map(function (topic) {
                        var arr = [];
                        arr.push(
                        // 小题空一行
                        new docx_1.Paragraph({
                            text: " "
                        }));
                        arr.push(new docx_1.Paragraph({
                            text: "\u7B2C " + ++number + " \u9898 " + topic.question + "\n",
                            heading: docx_1.HeadingLevel.HEADING_2
                        }));
                        // 每个单选题的选项
                        arr.push.apply(arr, topic.choice
                            .map(function (c) {
                            var array = [];
                            array.push(new docx_1.Paragraph({
                                text: c.name + ". " + c.content
                            }));
                            return array;
                        })
                            .reduce(function (prev, curr) { return prev.concat(curr); }, []));
                        return arr;
                    })
                        .reduce(function (prev, curr) { return prev.concat(curr); }, []), [
                        // 大题空两行
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: "多选题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ], multipleTopic
                        .map(function (topic) {
                        var arr = [];
                        arr.push(
                        // 小题空一行
                        new docx_1.Paragraph({
                            text: " "
                        }));
                        arr.push(new docx_1.Paragraph({
                            text: "\u7B2C " + ++number + " \u9898 " + topic.question + "\n",
                            heading: docx_1.HeadingLevel.HEADING_2
                        }));
                        // 每个多选题的选项
                        arr.push.apply(arr, topic.choice
                            .map(function (c) {
                            var array = [];
                            array.push(new docx_1.Paragraph({
                                text: c.name + ". " + c.content
                            }));
                            return array;
                        })
                            .reduce(function (prev, curr) { return prev.concat(curr); }, []));
                        return arr;
                    })
                        .reduce(function (prev, curr) { return prev.concat(curr); }, []), [
                        // 大题空两行
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: "判断题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ], trueOrFalseTopic
                        .map(function (topic) {
                        var arr = [];
                        arr.push(
                        // 小题空一行
                        new docx_1.Paragraph({
                            text: " "
                        }));
                        arr.push(new docx_1.Paragraph({
                            text: "\u7B2C " + ++number + " \u9898 " + topic.question + "\n",
                            heading: docx_1.HeadingLevel.HEADING_2
                        }));
                        return arr;
                    })
                        .reduce(function (prev, curr) { return prev.concat(curr); }, []), [
                        // 大题空两行
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: "填空题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ], fillTopic
                        .map(function (topic) {
                        var arr = [];
                        arr.push(
                        // 小题空一行
                        new docx_1.Paragraph({
                            text: " "
                        }));
                        arr.push(new docx_1.Paragraph({
                            text: "\u7B2C " + ++number + " \u9898 ",
                            heading: docx_1.HeadingLevel.HEADING_2
                        }));
                        // 每个填空题的每一空
                        arr.push.apply(arr, topic.question
                            .map(function (q) {
                            var array = [];
                            array.push(new docx_1.Paragraph({
                                text: q.head + "____" + q.tail
                            }));
                            return array;
                        })
                            .reduce(function (prev, curr) { return prev.concat(curr); }, []));
                        return arr;
                    }).reduce(function (prev, curr) { return prev.concat(curr); }, []), [
                        // 大题空两行
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: "简答题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ], answerTopic
                        .map(function (topic) {
                        var arr = [];
                        arr.push(
                        // 小题空一行
                        new docx_1.Paragraph({
                            text: " "
                        }));
                        arr.push(new docx_1.Paragraph({
                            text: "\u7B2C " + ++number + " \u9898 " + topic.question + "\n",
                            heading: docx_1.HeadingLevel.HEADING_2
                        }));
                        // 每个简答题的每一问
                        arr.push.apply(arr, topic.subQ
                            .map(function (s) {
                            var array = [];
                            array.push(new docx_1.Paragraph({
                                text: s.content
                            }));
                            return array;
                        })
                            .reduce(function (prev, curr) { return prev.concat(curr); }, []));
                        return arr;
                    })
                        .reduce(function (prev, curr) { return prev.concat(curr); }, []))
                },
                // 答案部分
                {
                    children: __spreadArrays([
                        new docx_1.Paragraph({
                            text: paperObj.Info.name + " 答案及解析",
                            heading: docx_1.HeadingLevel.TITLE,
                            alignment: docx_1.AlignmentType.CENTER
                        }),
                        new docx_1.Paragraph({
                            text: "单选题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ], singleTopic
                        .map(function (topic) {
                        var arr = [];
                        arr.push(
                        // 小题空一行
                        new docx_1.Paragraph({
                            text: " "
                        }));
                        arr.push(new docx_1.Paragraph({
                            text: "\u7B2C " + ++numberAnswer + " \u9898 \u7B54\u6848\uFF1A" + topic.answer + "解析：" + topic.explain,
                            heading: docx_1.HeadingLevel.HEADING_2
                        }));
                        // 每个单选题的选项
                        arr.push.apply(arr, topic.choice
                            .map(function (c) {
                            var array = [];
                            array.push(new docx_1.Paragraph({
                                text: c.name + ". " + c.content
                            }));
                            return array;
                        })
                            .reduce(function (prev, curr) { return prev.concat(curr); }, []));
                        return arr;
                    })
                        .reduce(function (prev, curr) { return prev.concat(curr); }, []), [
                        // 大题空两行
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: "多选题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ], multipleTopic
                        .map(function (topic) {
                        var arr = [];
                        arr.push(
                        // 小题空一行
                        new docx_1.Paragraph({
                            text: " "
                        }));
                        arr.push(new docx_1.Paragraph({
                            text: "\u7B2C " + ++numberAnswer + " \u9898 " + topic.question + "\n",
                            heading: docx_1.HeadingLevel.HEADING_2
                        }));
                        // 每个多选题的选项
                        arr.push.apply(arr, topic.answer
                            .map(function (a) {
                            var array = [];
                            array.push(new docx_1.Paragraph({
                                text: a + ""
                            }));
                            return array;
                        })
                            .reduce(function (prev, curr) { return prev.concat(curr); }, []));
                        arr.push(new docx_1.Paragraph({
                            text: "解析：" + topic.explain
                        }));
                        return arr;
                    })
                        .reduce(function (prev, curr) { return prev.concat(curr); }, []), [
                        // 大题空两行
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: "判断题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ], trueOrFalseTopic
                        .map(function (topic) {
                        var arr = [];
                        arr.push(
                        // 小题空一行
                        new docx_1.Paragraph({
                            text: " "
                        }));
                        arr.push(new docx_1.Paragraph({
                            text: "\u7B2C " + ++numberAnswer + " \u9898 \u7B54\u6848\uFF1A" + topic.answer + "解析：" + topic.explain,
                            heading: docx_1.HeadingLevel.HEADING_2
                        }));
                        return arr;
                    })
                        .reduce(function (prev, curr) { return prev.concat(curr); }, []), [
                        // 大题空两行
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: "填空题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ], fillTopic
                        .map(function (topic) {
                        var arr = [];
                        arr.push(
                        // 小题空一行
                        new docx_1.Paragraph({
                            text: " "
                        }));
                        arr.push(new docx_1.Paragraph({
                            text: "\u7B2C " + ++numberAnswer + " \u9898 ",
                            heading: docx_1.HeadingLevel.HEADING_2
                        }));
                        // 每个填空题的每一空
                        arr.push.apply(arr, topic.question
                            .map(function (q) {
                            var array = [];
                            array.push(new docx_1.Paragraph({
                                text: q.answer
                            }));
                            return array;
                        })
                            .reduce(function (prev, curr) { return prev.concat(curr); }, []));
                        arr.push(new docx_1.Paragraph({
                            text: "解析：" + topic.explain
                        }));
                        return arr;
                    }).reduce(function (prev, curr) { return prev.concat(curr); }, []), [
                        // 大题空两行
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: " "
                        }),
                        new docx_1.Paragraph({
                            text: "简答题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ], answerTopic
                        .map(function (topic) {
                        var arr = [];
                        arr.push(
                        // 小题空一行
                        new docx_1.Paragraph({
                            text: " "
                        }));
                        arr.push(new docx_1.Paragraph({
                            text: "\u7B2C " + ++numberAnswer + " \u9898 " + topic.question + "\n",
                            heading: docx_1.HeadingLevel.HEADING_2
                        }));
                        // 每个简答题的每一问
                        arr.push.apply(arr, topic.subQ
                            .map(function (s) {
                            var array = [];
                            array.push(new docx_1.Paragraph({
                                text: "答案" + s.answer
                            }));
                            return array;
                        })
                            .reduce(function (prev, curr) { return prev.concat(curr); }, []));
                        arr.push(new docx_1.Paragraph({
                            text: "解析：" + topic.explain
                        }));
                        return arr;
                    })
                        .reduce(function (prev, curr) { return prev.concat(curr); }, []))
                }
            ]
        });
        for (var i = 0; i < paperObj.Single.topic.length; i++) {
            console.log(paperObj.Single.topic[i]);
        }
        console.log("OK");
        return paper;
    };
    return PaperCreator;
}());
exports.PaperCreator = PaperCreator;
