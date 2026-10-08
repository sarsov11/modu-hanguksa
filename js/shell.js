/* 모두의 한국사 — 공통 머리띠·옷 (2026-10-08)
   모든 화면이 <header class="nav" id="nav"></header> 바로 뒤에서 이 파일을 부른다.
   머리띠를 화면마다 손으로 쓰면 또 따로 논다 → 여기 한 곳에서 그린다.
   옷: html[data-skin] = white(기본) · paper · night.  옛 화면 css 의 [data-look="night"] 도 같이 맞춘다. */
(function () {
  var 화면 = [
    ["index.html", "홈", "홈"],
    ["개념.html", "개념 흐름", "개념"],
    ["연표.html", "연표", "연표"],
    ["풀이.html", "기출 풀이", "풀이"],
    ["계보.html", "왕조 계보", "계보"],
    ["근현대.html", "근현대", "근현대"]
  ];
  var 옷들 = [["white", "흰 판"], ["paper", "종이"], ["night", "밤"]];
  var 지금 = decodeURIComponent(location.pathname.split("/").pop() || "index.html") || "index.html";
  var 좁음 = matchMedia("(max-width:900px)").matches;

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

  var nav = document.getElementById("nav");
  if (nav) {
    nav.className = "nav";
    nav.innerHTML = '<div class="wrap">' +
      '<a class="logo" href="index.html"><span class="dot"></span>모두의 한국사<small>테라러닝</small></a>' +
      '<nav class="navlinks" aria-label="화면">' + 화면.map(function (x) {
        return '<a href="' + x[0] + '"' + (x[0] === 지금 ? ' class="on" aria-current="page"' : "") + ">" +
          (좁음 ? x[2] : x[1]) + "</a>";
      }).join("") + "</nav>" +
      '<div class="navact"><button class="skinbtn" id="skinbtn" type="button" title="화면 색 바꾸기"></button></div>' +
      "</div>";
    document.getElementById("skinbtn").addEventListener("click", function () {
      var s = document.documentElement.dataset.skin || "white";
      var i = 옷들.findIndex(function (x) { return x[0] === s; });
      옷입기(옷들[(i + 1) % 옷들.length][0]);
    });
  }
  옷입기(document.documentElement.dataset.skin || "white");

  /* 머리띠 높이 — sticky 도구줄이 그 아래에 붙는다 */
  function 높이() {
    if (!nav) return;
    document.documentElement.style.setProperty("--hh", Math.round(nav.getBoundingClientRect().height) + "px");
  }
  높이();
  addEventListener("resize", 높이);
})();
