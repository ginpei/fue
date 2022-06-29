import { createReport } from "../../domains/reports/Report";
import { ReportItem } from "../../domains/reports/ReportItem";
import { BasicLayout } from "../../layouts/basic/BasicLayout";

const report = createReport({
  createdAt: new Date("2022-02-22 22:22:22").getTime(),
  ip: "127.0.0.1",
  message: "<h1> は見出しを意味します。文字が大きくするには CSS を使うべきです。\nhttps://developer.mozilla.org/ja/docs/Web/HTML/Element/Heading_Elements",
  quote: "<h1> タグは文字を大きくするのに使われます。",
  url: "https://example.com/html/tags/h1.html",
});

const quoteReport = createReport({
  createdAt: new Date("2014-07-31 17:16:00").getTime(),
  ip: "192.168.1.2",
  quote: "【天気】台風12号が性欲を強めながら東に進み、1日には沖縄に接近",
  url: "https://twitter.com/kyushushinpou/status/495000203359830017",
});

export function WhatPage(): JSX.Element {
  return (
    <BasicLayout name="WhatPage" title="What is this?">
      <h1>なにこれ？</h1>
      <p>
        例えばブログ記事の誤りを簡単に指摘できるサービスです。
      </p>
      <h2>例</h2>
      <p>
        送信された内容は、コンテンツ管理者へ以下のように表示されます。
      </p>
      <ReportItem report={report} />
      <p>誤字なんかは引用だけで伝わるかもしれません。</p>
      <ReportItem report={quoteReport} />
    </BasicLayout>
  );
}
