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
var PHONE_NUMBER = "07534563401";
var PROFILE_URL = "https://www.linkedin.com/in/dolan1";
var EMAIL = "docx@docx.com";
var PaperCreator = /** @class */ (function () {
    function PaperCreator() {
    }
    PaperCreator.prototype.create = function (jsonStr) {
        var paperObj = JSON.parse(jsonStr);
        var single = paperObj.Single;
        var singleTopic = single.topic;
        var fillTopic = paperObj.Fill.topic;
        console.log.apply(console, singleTopic);
        var paper = new docx_1.Document({
            sections: [
                {
                    children: __spreadArrays([
                        new docx_1.Paragraph({
                            text: paperObj.Info.name,
                            heading: docx_1.HeadingLevel.TITLE
                        }),
                        new docx_1.Paragraph({
                            text: "选择题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ], singleTopic
                        .map(function (topic) {
                        var arr = [];
                        arr.push(new docx_1.Paragraph({
                            text: topic.question,
                            heading: docx_1.HeadingLevel.HEADING_1,
                            children: __spreadArrays(topic.choice
                                .map(function (c) {
                                var arr = [];
                                arr.push(new docx_1.Paragraph({
                                    text: c.name + ". " + c.content
                                }));
                                return arr;
                            }).reduce(function (prev, curr) { return prev.concat(curr); }, []))
                        }));
                        return arr;
                    }).reduce(function (prev, curr) { return prev.concat(curr); }, []), [
                        new docx_1.Paragraph({
                            text: "多选题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        }),
                        new docx_1.Paragraph({
                            text: "判断题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        }),
                        new docx_1.Paragraph({
                            text: "填空题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ], fillTopic
                        .map(function (topic) {
                        var arr = [];
                        arr.push(new docx_1.Paragraph({
                            text: "\n",
                            heading: docx_1.HeadingLevel.HEADING_1,
                            children: __spreadArrays(topic.question
                                .map(function (q) {
                                var arr = [];
                                arr.push(new docx_1.Paragraph({
                                    text: q.head + "____" + q.tail
                                }));
                                return arr;
                            }).reduce(function (prev, curr) { return prev.concat(curr); }, []))
                        }));
                        return arr;
                    }).reduce(function (prev, curr) { return prev.concat(curr); }, []), [
                        new docx_1.Paragraph({
                            text: "简答题",
                            heading: docx_1.HeadingLevel.HEADING_1
                        })
                    ])
                }
            ]
        });
        for (var i = 0; i < paperObj.Single.topic.length; i++) {
            console.log(paperObj.Single.topic[i]);
        }
        console.log("OK");
        return paper;
    };
    // tslint:disable-next-line: typedef
    PaperCreator.prototype.create1 = function (_a) {
        var _this = this;
        var experiences = _a[0], educations = _a[1], skills = _a[2], achivements = _a[3];
        var document = new docx_1.Document({
            sections: [
                {
                    children: __spreadArrays([
                        new docx_1.Paragraph({
                            text: "Dolan Miu",
                            heading: docx_1.HeadingLevel.TITLE
                        }),
                        this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
                        this.createHeading("Education")
                    ], educations
                        .map(function (education) {
                        var arr = [];
                        arr.push(_this.createInstitutionHeader(education.schoolName, education.startDate.year + " - " + education.endDate.year));
                        arr.push(_this.createRoleText(education.fieldOfStudy + " - " + education.degree));
                        var bulletPoints = _this.splitParagraphIntoBullets(education.notes);
                        bulletPoints.forEach(function (bulletPoint) {
                            arr.push(_this.createBullet(bulletPoint));
                        });
                        return arr;
                    })
                        .reduce(function (prev, curr) { return prev.concat(curr); }, []), [
                        this.createHeading("Experience")
                    ], experiences
                        .map(function (position) {
                        var arr = [];
                        arr.push(_this.createInstitutionHeader(position.company.name, _this.createPositionDateText(position.startDate, position.endDate, position.isCurrent)));
                        arr.push(_this.createRoleText(position.title));
                        var bulletPoints = _this.splitParagraphIntoBullets(position.summary);
                        bulletPoints.forEach(function (bulletPoint) {
                            arr.push(_this.createBullet(bulletPoint));
                        });
                        return arr;
                    })
                        .reduce(function (prev, curr) { return prev.concat(curr); }, []), [
                        this.createHeading("Skills, Achievements and Interests"),
                        this.createSubHeading("Skills"),
                        this.createSkillList(skills),
                        this.createSubHeading("Achievements")
                    ], this.createAchivementsList(achivements), [
                        this.createSubHeading("Interests"),
                        this.createInterests("Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."),
                        this.createHeading("References"),
                        new docx_1.Paragraph("Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk"),
                        new docx_1.Paragraph("More references upon request"),
                        new docx_1.Paragraph({
                            text: "This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.",
                            alignment: docx_1.AlignmentType.CENTER
                        })
                    ])
                }
            ]
        });
        return document;
    };
    PaperCreator.prototype.createContactInfo = function (phoneNumber, profileUrl, email) {
        return new docx_1.Paragraph({
            alignment: docx_1.AlignmentType.CENTER,
            children: [
                new docx_1.TextRun("Mobile: " + phoneNumber + " | LinkedIn: " + profileUrl + " | Email: " + email),
                new docx_1.TextRun({
                    text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
                    "break": 1
                })
            ]
        });
    };
    PaperCreator.prototype.createHeading = function (text) {
        return new docx_1.Paragraph({
            text: text,
            heading: docx_1.HeadingLevel.HEADING_1,
            thematicBreak: true
        });
    };
    PaperCreator.prototype.createSubHeading = function (text) {
        return new docx_1.Paragraph({
            text: text,
            heading: docx_1.HeadingLevel.HEADING_2
        });
    };
    PaperCreator.prototype.createInstitutionHeader = function (institutionName, dateText) {
        return new docx_1.Paragraph({
            tabStops: [
                {
                    type: docx_1.TabStopType.RIGHT,
                    position: docx_1.TabStopPosition.MAX
                }
            ],
            children: [
                new docx_1.TextRun({
                    text: institutionName,
                    bold: true
                }),
                new docx_1.TextRun({
                    text: "\t" + dateText,
                    bold: true
                })
            ]
        });
    };
    PaperCreator.prototype.createRoleText = function (roleText) {
        return new docx_1.Paragraph({
            children: [
                new docx_1.TextRun({
                    text: roleText,
                    italics: true
                })
            ]
        });
    };
    PaperCreator.prototype.createBullet = function (text) {
        return new docx_1.Paragraph({
            text: text,
            bullet: {
                level: 0
            }
        });
    };
    // tslint:disable-next-line:no-any
    PaperCreator.prototype.createSkillList = function (skills) {
        return new docx_1.Paragraph({
            children: [new docx_1.TextRun(skills.map(function (skill) { return skill.name; }).join(", ") + ".")]
        });
    };
    // tslint:disable-next-line:no-any
    PaperCreator.prototype.createAchivementsList = function (achivements) {
        return achivements.map(function (achievement) {
            return new docx_1.Paragraph({
                text: achievement.name,
                bullet: {
                    level: 0
                }
            });
        });
    };
    PaperCreator.prototype.createInterests = function (interests) {
        return new docx_1.Paragraph({
            children: [new docx_1.TextRun(interests)]
        });
    };
    PaperCreator.prototype.splitParagraphIntoBullets = function (text) {
        return text.split("\n\n");
    };
    // tslint:disable-next-line:no-any
    PaperCreator.prototype.createPositionDateText = function (startDate, endDate, isCurrent) {
        var startDateText = this.getMonthFromInt(startDate.month) + ". " + startDate.year;
        var endDateText = isCurrent
            ? "Present"
            : this.getMonthFromInt(endDate.month) + ". " + endDate.year;
        return startDateText + " - " + endDateText;
    };
    PaperCreator.prototype.getMonthFromInt = function (value) {
        switch (value) {
            case 1:
                return "Jan";
            case 2:
                return "Feb";
            case 3:
                return "Mar";
            case 4:
                return "Apr";
            case 5:
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "Jul";
            case 8:
                return "Aug";
            case 9:
                return "Sept";
            case 10:
                return "Oct";
            case 11:
                return "Nov";
            case 12:
                return "Dec";
            default:
                return "N/A";
        }
    };
    return PaperCreator;
}());
exports.PaperCreator = PaperCreator;
