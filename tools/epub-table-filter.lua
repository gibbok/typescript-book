-- GFM requires escaped pipes in table cells, including inline code. Pandoc's
-- Markdown reader preserves those escapes inside code, so remove them in tables.
function Table(el)
    return el:walk({
        Code = function(code)
            code.text = code.text:gsub("\\|", "|")
            return code
        end,
        Str = function(str)
            for _, symbol in ipairs({ "∅", "∈", "⊆", "∪", "∩" }) do
                if str.text == symbol then
                    return pandoc.Span({ str }, pandoc.Attr("", { "set-symbol" }))
                end
            end
        end,
    })
end

-- Keep introductory text on the same PDF page as the table it introduces.
function Blocks(blocks)
    for i = 2, #blocks do
        if blocks[i].t == "Table" and blocks[i - 1].t == "Para" then
            blocks[i - 1] = pandoc.Div(
                { blocks[i - 1] },
                pandoc.Attr("", { "table-introduction" })
            )
        end
    end
    return blocks
end
