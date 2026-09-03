local function set_ltr(el)
  el.attributes.dir = "ltr"
  return el
end

function Pandoc(doc)
    if pandoc.utils.stringify(doc.meta.lang) ~= "ar" then
        return doc
    end

  return doc:walk({
    Header = function(el)
      el.attributes.dir = "rtl"
      return el
    end,
    Code = set_ltr,
    CodeBlock = set_ltr,
  })
end
