const WORDS = Object.freeze([
    // C言語
    "#include <stdio.h>", "stdio.h",
    "#include <stdlib.h>", "stdlib.h",
    "int main(void) {", "return 0;",
    "printf(\"Hello, World!\\n\");",
    "scanf(\"%s\", foo)",
    "getchar()", "gets()",
    "putchar()", "puts()",
    "for(i=0; i<16; i++) {",
    "%d", "%f", "%lf", "%s",
    "break;", "continue;",
    "\\0", "\\n",
    "i++;", "i--;",

    // データ型
    "int", "float", "double", "char", "void",

    // Java
    "public static void main(String[] args)",
    "System.out.println()",

    // HTML
    "</html>", "</head>", "</body>", "</title>",
    "</hr>", "</br>",
    "<p/>", "</pre>",
    "</b>", "</small>",
    "</ul>", "</ol>", "</li>",
    "</table>", "</tr>", "</th>", "</td>",
    "</a>", "<img src=\"url\">",
    "</div>", "</span>",

    // メタ構文変数
    "foo", "bar", "baz", "qux", "xyzzy",
    "hoge", "fuga", "piyo", "hogera",
    "42", "0xDEADBEAF", "ACME",
    "example.com", "example.net", "example.org",
    "J. Random Hacker",

    // Linux
    ":~$ pwd", "~$ cd", "~$ ls", "~$ mv",
    "~$ cp", "~$ clear", "~$ mkdir", "~$ touch",
    "~$ rmdir", "~$ rm", "~$ cat", "~$ grep", "~$ man",
    "user@host:~$",

    // ネットワーク
    "http://", "https://", "www", "localhost:8080/",
    "127.0.0.1",

    // コメント
    "// dead code", "// hard coding", "// magic number",
    "// TODO",
    "<!-- this is a comment -->",
    "/* this is a comment */",

    "CR", "LF", "CRLF", "EOL", "EOF",

    // HTTPステータスコード
    "200 OK", "400 Bad Request", "401 Unauthorized",
    "403 Forbidden", "404 Not Found", "410 Gone",
    "418 I'm a teapot", "500 Internal Server Error",
])