let words = "beever";

// Buatlah skema logika untuk memuat kata diatas menjadi berbentuk seperti berikut :
// b
// be
// bee
// beev
// beeve
// beever

for (let i = 0; i < words.length; i++) {
  let result = words.slice(0, i + 1);
  console.log(result);
}
