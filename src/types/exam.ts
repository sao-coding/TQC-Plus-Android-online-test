// {
//     "id": "b20bb985-1979-4c15-9152-4aa54277c791",
//     "title": "當設定相關性參數後，模組組態檔build.gradle的dependencies資料內容會變動。下列哪些項目是屬於正確的相關性設定值？",
//     "type": "multiple",
//     "options": [
//         {
//             "id": "1",
//             "content": "compile 'com.android.support:appcompat-v7:23.0.1'"
//         },
//         {
//             "id": "2",
//             "content": "compile project(':MyUtilities')"
//         },
//         {
//             "id": "3",
//             "content": "compile files('libs/json.jar')"
//         },
//         {
//             "id": "4",
//             "content": "\"compile fileTree(dir:'libs'"
//         }
//     ],
//     "answer": [
//         "1",
//         "2",
//         "3",
//         "4"
//     ]
// },
export type Exam = {
    id: string
    title: string
    type: string
    options: {
        id: string
        content: string
    }[]
    answer: string[]
}

export type ExamAnswer = {
    id: string
    answer: string[]
}
