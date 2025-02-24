const hljs = require('highlight.js/lib/highlight');

function tt2PseudoPerl() {
    return {
        name: 'TT2 Pseudo-Perl',
        contains: [
            hljs.HASH_COMMENT_MODE,
            hljs.QUOTE_STRING_MODE,
            hljs.APOS_STRING_MODE,
            hljs.C_NUMBER_MODE,
            {
                className: 'function',
                begin: /(\$?[a-zA-Z_]\w*)\.(\w+)\s*\(/,
                returnBegin: true,
                contains: [
                    {
                        className: 'variable',
                        begin: /(\$?[a-zA-Z_]\w*)/,
                    },
                    {
                        className: 'function',
                        begin: /\.(\w+)/,
                        excludeBegin: true,
                    },
                    {
                        begin: /\(/,
                        end: /\)/,
                        contains: [
                            hljs.QUOTE_STRING_MODE,
                            hljs.APOS_STRING_MODE,
                            hljs.C_NUMBER_MODE,
                            hljs.HASH_COMMENT_MODE
                        ],
                    },
                ],
            },
            {
                className: 'variable',
                begin: /\$[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*/,
            },
            {
                className: 'variable',
                begin: /(\$?[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*)/,
                keywords: 'IF ELSE ELSIF UNLESS SWITCH CASE FOR FOREACH WHILE NEXT LAST RETURN STOP TRY THROW CATCH END FILTER MACRO SET DEFAULT INSERT INCLUDE PROCESS WRAPPER BLOCK CALL USE DEBUG TAGS',
            }
        ]
    };
}

function tt2() {
    return {
        name: 'Template Toolkit (HTML + PseudoPerl)',
        subLanguage: 'xml',
        contains: [
            {
                begin: '\\[%-?',
                end: '-?%\\]',
                subLanguage: 'tt2-pseudoperl',
                excludeBegin: true,
                excludeEnd: true
            },
            {
                begin: /<script\b[^>]*>/, 
                end: /<\/script>/,
                subLanguage: 'javascript',
                excludeBegin: true,
                excludeEnd: true,
                contains: [
                    {
                        begin: '\\[%-?',
                        end: '-?%\\]',
                        subLanguage: 'tt2-pseudoperl',
                        excludeBegin: true,
                        excludeEnd: true
                    }
                ]
            }
        ]
    };
}

module.exports = {
    tt2PseudoPerl,
    tt2
};