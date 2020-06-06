let num1 = 0; //★1出現回数
let num2 = 0; //★2出現回数
let num3 = 0; //★3出現回数
let count = 0; //ガチャを回した回数

// 10回引くをクリックした場合
$(".play>img").on("click", function () {
  // localStorageに情報があるか確認する
  storage();
  $("#result").css("display", "none");
  // ガチャ演出動画を再生
  // 再生後再度非表示にする
  if ($("#gachamovie>video").css("display") == "none") {
    $("#gachamovie>video").css("display", "inline");
    setTimeout(function () {
      $("#gachamovie>video").css("display", "none");
    }, 6720);
    setTimeout(function () {
      $("#result").css("display", "block");
    }, 6720);
    // ガチャを回した回数をlocalStorageに保存
    count += 10;
    console.log(count);
    localStorage.setItem("count", count);
    // 10連ガチャメソッドの呼び出し
    gacha();
    // addメソッドの呼び出し
    // 表、テーブルに反映させる
    add();
  }
});

// 表、テーブルに反映させる
function add() {
  let kakuritsu1 = (num1 / count) * 100;
  let kakuritsu2 = (num2 / count) * 100;
  let kakuritsu3 = (num3 / count) * 100;
  $("#count").text(count);
  $("#count").css("color", "red");
  $("#juel").text(count * 150);
  $("#juel").css("color", "red");
  $("#ha1").text(num1);
  $("#ka1").text(Math.round(kakuritsu1 * 10) / 10 + "%");
  $("#ha2").text(num2);
  $("#ka2").text(Math.round((kakuritsu2 * 10) / 10) + "%");
  $("#ha3").text(num3);
  $("#ka3").text(Math.round((kakuritsu3 * 10) / 10) + "%");
}

// 確率をリセットするをクリックした場合
$("#reset").on("click", function () {
  localStorage.clear();
  location.reload();
});

// localStorageに情報が残っているときの処理
function storage() {
  if (localStorage.getItem("count")) {
    count = Number(localStorage.getItem("count"));
  }
  if (localStorage.getItem("★1")) {
    num1 = localStorage.getItem("★1");
  }
  if (localStorage.getItem("★2")) {
    num2 = localStorage.getItem("★2");
  }
  if (localStorage.getItem("★3")) {
    num3 = localStorage.getItem("★3");
  }
}

// 10連ガチャメソッド
function gacha() {
  for (let i = 0; i < 10; i++) {
    // キャラ選択メソッドの呼び出し
    let { rarity, characterimg } = character();
    $("#area" + i).attr("src", characterimg);
    $("#text" + i).text(rarity);
    switch (rarity) {
      case "★1":
        num1++;
        localStorage.setItem(rarity, num1);
        break;
      case "★2":
        num2++;
        localStorage.setItem(rarity, num2);
        break;
      case "★3":
        num3++;
        localStorage.setItem(rarity, num3);
        break;
    }
  }
}

// 確率メソッド
function random() {
  let probability = Math.random();
  let rarity = "";
  if (probability < 0.795) {
    rarity = "★1";
  } else if (probability < 0.975) {
    rarity = "★2";
  } else {
    rarity = "★3";
  }
  return rarity;
}

// キャラ選択メソッド
function character() {
  // ★1キャラリスト
  let imglist1 = new Array(
    "hiyori.PNG",
    "kokkoro.PNG",
    "kyaru.PNG",
    "pekorinu.PNG",
    "rei.PNG",
    "yui.PNG"
  );
  // ★2キャラリスト
  let imglist2 = new Array(
    "chika.PNG",
    "eriko.PNG",
    "miyako.PNG",
    "shinobu.PNG",
    "tamaki.PNG",
    "tsumugi.PNG"
  );
  // ★3キャラリスト
  let imglist3 = new Array(
    "chieru.PNG",
    "kurisuthina.PNG",
    "kuroe.PNG",
    "muimi.PNG",
    "neneka.PNG",
    "yuni.PNG"
  );
  // キャラクターをランダムで選ぶ
  let selectnum = Math.floor(Math.random() * 6);
  let rarity = random();
  let characterimg = "";
  switch (rarity) {
    case "★1":
      characterimg = "img/★1/" + imglist1[selectnum];
      break;
    case "★2":
      characterimg = "img/★2/" + imglist2[selectnum];
      break;
    case "★3":
      characterimg = "img/★3/" + imglist3[selectnum];
      break;
  }
  return { rarity, characterimg };
}
