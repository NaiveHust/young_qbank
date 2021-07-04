<template>
    <el-button @click="jsonToPaper()">生成</el-button>
</template>

<script>

  import {jsonToPaper} from "../../office";

  export default {
    methods: {
      jsonToPaper() {
        jsonToPaper("{\n" +
            "  \"Info\": {\n" +
            "    \"name\": \"测试卷\",\n" +
            "    \"score\": 150,\n" +
            "    \"duration\": \"2min\"\n" +
            "  },\n" +
            "  \"Single\": {\n" +
            "    \"info\": \"\",\n" +
            "    \"topic\": [\n" +
            "      {\n" +
            "        \"order\": 1,\n" +
            "        \"score\": 3,\n" +
            "        \"question\": \"1+1=？\",\n" +
            "        \"choice\": [\n" +
            "          {\n" +
            "            \"order\": 1,\n" +
            "            \"name\": \"A\",\n" +
            "            \"content\": \"1\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 2,\n" +
            "            \"name\": \"B\",\n" +
            "            \"content\": \"3\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 3,\n" +
            "            \"name\": \"C\",\n" +
            "            \"content\": \"4\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 4,\n" +
            "            \"name\": \"D\",\n" +
            "            \"content\": \"2\"\n" +
            "          }\n" +
            "        ],\n" +
            "        \"answer\": \"D\",\n" +
            "        \"explain\": \"1+1=2\"\n" +
            "      },\n" +
            "      {\n" +
            "        \"order\": 2,\n" +
            "        \"score\": 3,\n" +
            "        \"question\": \"2+2=？\",\n" +
            "        \"choice\": [\n" +
            "          {\n" +
            "            \"order\": 1,\n" +
            "            \"name\": \"A\",\n" +
            "            \"content\": \"1\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 2,\n" +
            "            \"name\": \"B\",\n" +
            "            \"content\": \"2\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 3,\n" +
            "            \"name\": \"C\",\n" +
            "            \"content\": \"3\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 4,\n" +
            "            \"name\": \"D\",\n" +
            "            \"content\": \"4\"\n" +
            "          }\n" +
            "        ],\n" +
            "        \"answer\": \"\",\n" +
            "        \"explain\": \"2+2=4\"\n" +
            "      }\n" +
            "    ]\n" +
            "  },\n" +
            "  \"Multiple\": {\n" +
            "    \"info\": \"\",\n" +
            "    \"topic\": [\n" +
            "      {\n" +
            "        \"order\": 1,\n" +
            "        \"score\": 3,\n" +
            "        \"question\": \"1+1>?\",\n" +
            "        \"choice\": [\n" +
            "          {\n" +
            "            \"order\": 1,\n" +
            "            \"name\": \"A\",\n" +
            "            \"content\": \"0\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 2,\n" +
            "            \"name\": \"B\",\n" +
            "            \"content\": \"1\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 3,\n" +
            "            \"name\": \"C\",\n" +
            "            \"content\": \"2\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 4,\n" +
            "            \"name\": \"D\",\n" +
            "            \"content\": \"3\"\n" +
            "          }\n" +
            "        ],\n" +
            "        \"answer\": [\n" +
            "          \"B\",\n" +
            "          \"A\"\n" +
            "        ],\n" +
            "        \"explain\": \"1+1=2\"\n" +
            "      },\n" +
            "      {\n" +
            "        \"order\": 2,\n" +
            "        \"score\": 3,\n" +
            "        \"question\": \"1+2>=?\",\n" +
            "        \"choice\": [\n" +
            "          {\n" +
            "            \"order\": 1,\n" +
            "            \"name\": \"A\",\n" +
            "            \"content\": \"1\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 2,\n" +
            "            \"name\": \"B\",\n" +
            "            \"content\": \"2\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 3,\n" +
            "            \"name\": \"C\",\n" +
            "            \"content\": \"3\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 4,\n" +
            "            \"name\": \"D\",\n" +
            "            \"content\": \"4\"\n" +
            "          }\n" +
            "        ],\n" +
            "        \"answer\": [\n" +
            "          \"D\",\n" +
            "          \"C\"\n" +
            "        ],\n" +
            "        \"explain\": \"1+2=3\"\n" +
            "      }\n" +
            "    ]\n" +
            "  },\n" +
            "  \"Truefalse\": {\n" +
            "    \"info\": \"\",\n" +
            "    \"topic\": [\n" +
            "      {\n" +
            "        \"order\": 1,\n" +
            "        \"score\": 2,\n" +
            "        \"question\": \"1+1=2\",\n" +
            "        \"answer\": true,\n" +
            "        \"explain\": \"1+1=2\"\n" +
            "      },\n" +
            "      {\n" +
            "        \"order\": 2,\n" +
            "        \"score\": 2,\n" +
            "        \"question\": \"1+1+1=3\",\n" +
            "        \"answer\": true,\n" +
            "        \"explain\": \"1+1+1=2+1=3\"\n" +
            "      },\n" +
            "      {\n" +
            "        \"order\": 3,\n" +
            "        \"score\": 2,\n" +
            "        \"question\": \"1+44=44\",\n" +
            "        \"answer\": false,\n" +
            "        \"explain\": \"1+44=45\"\n" +
            "      }\n" +
            "    ]\n" +
            "  },\n" +
            "  \"Fill\": {\n" +
            "    \"info\": \"\",\n" +
            "    \"topic\": [\n" +
            "      {\n" +
            "        \"order\": 1,\n" +
            "        \"score\": 5,\n" +
            "        \"question\": [\n" +
            "          {\n" +
            "            \"order\": 1,\n" +
            "            \"head\": \"中国在\",\n" +
            "            \"tail\": \"年建国。\",\n" +
            "            \"answer\": \"1949\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 2,\n" +
            "            \"head\": \"二战中，日本在\",\n" +
            "            \"tail\": \"年投降。\",\n" +
            "            \"answer\": \"1945\"\n" +
            "          }\n" +
            "        ],\n" +
            "        \"explain\": \"\"\n" +
            "      }\n" +
            "    ]\n" +
            "  },\n" +
            "  \"Answer\": {\n" +
            "    \"info\": \"\",\n" +
            "    \"topic\": [\n" +
            "      {\n" +
            "        \"order\": 1,\n" +
            "        \"score\": 10,\n" +
            "        \"question\": \"小明和小红是朋友\",\n" +
            "        \"subQ\": [\n" +
            "          {\n" +
            "            \"order\": 1,\n" +
            "            \"content\": \"小明和谁是朋友？\",\n" +
            "            \"answer\": \"小红\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 2,\n" +
            "            \"content\": \"小红和谁是朋友？\",\n" +
            "            \"answer\": \"小明\"\n" +
            "          }\n" +
            "        ],\n" +
            "        \"explain\": \"朋友是互相的。\"\n" +
            "      },\n" +
            "      {\n" +
            "        \"order\": 2,\n" +
            "        \"score\": 10,\n" +
            "        \"question\": \"1+1=2;\\n2+2=4;\\n4+4=8;\",\n" +
            "        \"subQ\": [\n" +
            "          {\n" +
            "            \"order\": 1,\n" +
            "            \"content\": \"1+1=?\",\n" +
            "            \"answer\": \"2\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 2,\n" +
            "            \"content\": \"2+2=?\",\n" +
            "            \"answer\": \"4\"\n" +
            "          },\n" +
            "          {\n" +
            "            \"order\": 3,\n" +
            "            \"content\": \"4+4=?\",\n" +
            "            \"answer\": \"8\"\n" +
            "          }\n" +
            "        ],\n" +
            "        \"explain\": \"见题目\"\n" +
            "      }\n" +
            "    ]\n" +
            "  }\n" +
            "}")
      }
    }
  }



</script>

<style scoped>

</style>