/**
 *  keyword suggest library
 *  (c) Hideaki Tanabe <http://blog.kaihatsubu.com>
 *  Licensed under the MIT License.
 */
var Suggester = function() {

  var CACHE_SIZE = 50;
  var SUGGEST_MAX = 10;
  var words = [];
  var cache = [];

  /**
   *  initialize
   *  @param words word list
   */
  function initialize(words) {
    this.words = words.concat();
  }

  function escapeMetaWord(input) {
    var escaped = input;
    escaped = input.replace(/\./, "\\.");
    escaped = input.replace(/\^/, "\\^");
    escaped = input.replace(/\$/, "\\$");
    escaped = input.replace(/\[/, "\\[");
    escaped = input.replace(/\]/, "\\]");
    escaped = input.replace(/\(/, "\\(");
    escaped = input.replace(/\)/, "\\)");
    return escaped;
  }

  /**
   *  get cache
   *  @param text serach text
   *  return cached list
   */
  function getCache(text) {
    for (var i = 0, length = cache.length; i < length; i++) {
      if (cache[i].text === text) {
        return cache[i].list.concat();
      }
    }
    return null;
  }

  /**
   *  set cache
   *  @param text text
   *  @param list list
   */
  function setCache(text, list) {
    if (cache.length > CACHE_SIZE) {
      cache.pop();
    }
    cache.unshift({text: text, list: list.concat()});
  }

  /**
   *  search words
   *  @param text text
   *  @return array of matches
   */
  function search(text) {
    var result = getCache(text) || [];
    //use cache
    if (text && result.length === 0) {
      try {
        var pattern = new RegExp(escapeMetaWord(text), "ig");
        for (var i = 0, length = this.words.length; i < length; i++) {
          var word = this.words[i];
          if (pattern.test(word)) {
            result.push(word);
          }
        }
        setCache(text, result.concat());
      } catch (error) {
        //do nothing
      }
    }
    return result;
  }

  var Suggester = {};
  Suggester.initialize = initialize;
  Suggester.search = search;
  return Suggester;
};
