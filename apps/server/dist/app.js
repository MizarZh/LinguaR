"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = require("./model/model");
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/:lang/articles', (req, res) => {
    console.log(req.params, req.query);
});
app.get('/api/:lang/article', (req, res) => {
    return (0, model_1.getArticle)(req.params.lang);
});
app.get('/api/:lang/vocab', (req, res) => { });
app.post('/api/:lang/vocab', (req, res) => {
    (0, model_1.insertVocab)(req.params.lang, req.body);
});
app.get('/api/test/:lang/article', (req, res) => {
    (0, model_1.insertArticle)(req.params.lang, {
        tokens: 'tests',
        tag: 'tst',
        note: 'fji',
        collection: 'great',
    });
});
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map