/* 모두의 한국사 — 공통 머리띠·옷 (2026-10-08)
   모든 화면이 <header class="nav" id="nav"></header> 바로 뒤에서 이 파일을 부른다.
   머리띠를 화면마다 손으로 쓰면 또 따로 논다 → 여기 한 곳에서 그린다.
   옷: html[data-skin] = white(기본) · paper · night.  옛 화면 css 의 [data-look="night"] 도 같이 맞춘다. */
(function () {
  var 화면 = [
    ["index.html", "오늘", "오늘"],
    ["지도.html", "합격 지도", "합격 지도"],
    ["개념.html", "개념", "개념"],
    ["풀이.html", "기출", "기출"],
    ["설정.html", "설정", "설정"]
  ];
  var 옷들 = [["white", "흰 판"], ["paper", "종이"], ["night", "밤"]];
  var 지금 = decodeURIComponent(location.pathname.split("/").pop() || "index.html") || "index.html";

  function 옷입기(s) {
    var r = document.documentElement;
    r.dataset.skin = s;
    r.dataset.look = s === "night" ? "night" : "paper";
    try { localStorage.setItem("hs-skin", s); } catch (e) {}
    var b = document.getElementById("skinbtn");
    if (b) b.textContent = (옷들.find(function (x) { return x[0] === s; }) || 옷들[0])[1];
    document.dispatchEvent(new CustomEvent("hs-skin", { detail: s }));
  }
  window.HS = window.HS || {};
  window.HS.옷입기 = 옷입기;

  /* ── 2026-11-10 화면 표준: 머리띠 56px(표식 28 · 이름 · 과목 · 격자 단추) · 아래 탭 62px(아이콘 23 + 글자 11.5) ── */
  var S = 'fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"';
  var 그림 = {
    "index.html": '<svg viewBox="0 0 24 24" ' + S + '><path d="M4 11.2 12 4l8 7.2V19a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 0 1 4 19z"/></svg>',
    "개념.html": '<svg viewBox="0 0 24 24" ' + S + '><path d="M12 6.5C10.2 5 7.6 4.5 4.5 4.8v13c3.1-.3 5.7.2 7.5 1.7 1.8-1.5 4.4-2 7.5-1.7v-13c-3.1-.3-5.7.2-7.5 1.7zM12 6.5v13"/></svg>',
    "지도.html": '<svg viewBox="0 0 24 24" ' + S + '><circle cx="6.5" cy="5.5" r="2.4"/><circle cx="6.5" cy="18.5" r="2.4"/><circle cx="17.5" cy="9.5" r="2.4"/><path d="M6.5 7.9v8.2M17.5 11.9c0 3.4-3.6 3.2-8.6 5.2"/></svg>',
    "설정.html": '<svg viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="12" r="3.2"/><path d="M12 3.2v2.4M12 18.4v2.4M3.2 12h2.4M18.4 12h2.4M5.8 5.8l1.7 1.7M16.5 16.5l1.7 1.7M18.2 5.8l-1.7 1.7M7.5 16.5l-1.7 1.7"/></svg>',
    "연표.html": '<svg viewBox="0 0 24 24" ' + S + '><path d="M5 4v16M5 7h9M5 12h13M5 17h7"/></svg>',
    "풀이.html": '<svg viewBox="0 0 24 24" ' + S + '><path d="M13.2 3 5.5 13.4h5.6L10.2 21l8.3-10.6h-5.7z"/></svg>',
    "계보.html": '<svg viewBox="0 0 24 24" ' + S + '><circle cx="12" cy="5.5" r="2.4"/><circle cx="6" cy="18.5" r="2.4"/><circle cx="18" cy="18.5" r="2.4"/><path d="M12 8v4M6 16v-2.5a1.5 1.5 0 0 1 1.5-1.5h9a1.5 1.5 0 0 1 1.5 1.5V16"/></svg>',
    "근현대.html": '<svg viewBox="0 0 24 24" ' + S + '><path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 0 0-13 0c0 5.400 6.500 11 6.500 11z"/><circle cx="12" cy="10" r="2.3"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7.5" height="7.5" rx="2.2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2.2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2.2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2.2"/></svg>',
    back: '<svg viewBox="0 0 24 24" ' + S + ' stroke-width="2.4"><path d="m14.5 5.5-6.5 6.5 6.5 6.5"/></svg>',
    close: '<svg viewBox="0 0 24 24" ' + S + ' stroke-width="2.4"><path d="M6 6l12 12M18 6 6 18"/></svg>'
  };
  var 안쪽제목 = document.body && document.body.getAttribute("data-inner");
  var nav = document.getElementById("nav");
  if (nav) {
    nav.className = "nav";
    nav.innerHTML = '<div class="wrap gin">' +
      '<div class="g-out"><a class="gb" href="index.html"><span class="mk">대</span><span class="nm">모두의 <em>대입</em></span><small class="sb">한국사</small></a>' +
      '<nav class="navlinks" aria-label="화면">' + 화면.map(function (x) {
        return '<a href="' + x[0] + '"' + (x[0] === 지금 ? ' class="on" aria-current="page"' : "") + ">" + x[2] + "</a>";
      }).join("") + "</nav>" +
      '<div class="navact"><button class="skinbtn" id="skinbtn" type="button" title="화면 색 바꾸기"></button></div>' +
      '<a class="fam" href="https://teralearning.kr/" aria-label="테라러닝 전체 서비스">' + 그림.grid + '</a></div>' +
      '<div class="g-in"><a class="bk" href="' + (document.body.getAttribute("data-back") || "index.html") + '" aria-label="뒤로">' + 그림.back + '</a><b class="gt">' + (안쪽제목 || "") + '</b><a class="xx" href="index.html" aria-label="닫기">' + 그림.close + '</a></div>' +
      "</div>";
    document.getElementById("skinbtn").addEventListener("click", function () {
      var s = document.documentElement.dataset.skin || "white";
      var i = 옷들.findIndex(function (x) { return x[0] === s; });
      옷입기(옷들[(i + 1) % 옷들.length][0]);
    });
    if (안쪽제목) document.body.classList.add("inner", "notab");
    else {
      var t = document.createElement("nav");
      t.className = "gtabs"; t.style.gridTemplateColumns = "repeat(" + 화면.length + ",1fr)";
      t.innerHTML = 화면.map(function (x) {
        return '<a href="' + x[0] + '"' + (x[0] === 지금 ? ' class="on" aria-current="page"' : "") + ">" + (그림[x[0]] || "") + "<span>" + x[2] + "</span></a>";
      }).join("");
      document.body.appendChild(t);
    }
  }
  옷입기(document.documentElement.dataset.skin || "white");

  /* 머리띠 높이 — sticky 도구줄이 그 아래에 붙는다 */
  function 높이() {
    if (!nav) return;
    document.documentElement.style.setProperty("--hh", Math.round(nav.getBoundingClientRect().height) + "px");
  }
  높이();
  addEventListener("resize", 높이);

  /* 11-10 용어 9절 — 공용 엔진(zzstrat)이 그리는 「합격전략」은 「합격 전략」으로. 엔진 파일은 두고 여기서 글자만 바꾼다 */
  (function () {
    function 고침(root) {
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
      while ((n = w.nextNode())) if (n.nodeValue.indexOf("합격전략") >= 0) n.nodeValue = n.nodeValue.replace(/합격전략/g, "합격 전략");
    }
    function 돌기() { document.querySelectorAll(".zs-fab,.zs-btn,#zs-host").forEach(고침); }
    try { new MutationObserver(돌기).observe(document.body || document.documentElement, { childList: true, subtree: true, characterData: true }); } catch (e) { }
    document.addEventListener("DOMContentLoaded", 돌기); 돌기();
  })();
})();
