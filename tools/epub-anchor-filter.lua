local function ascii_anchor(n)
  return string.format("sec-%04d", n)
end

local function source_slug(text)
  text = text:gsub("“", "")
  text = text:gsub("”", "")
  text = text:gsub("‘", "")
  text = text:gsub("’", "")
  text = pandoc.text.lower(text)
  text = text:gsub("–", "--")
  text = text:gsub("—", "---")
  text = text:gsub("[!\"#$%%&'()*+,./:;<=>?@[\\]^_`{|}~]", "")
  text = text:gsub("%s+", "-")
  text = text:gsub("^%-+", "")
  text = text:gsub("%-+$", "")
  return text
end

local function build_anchor_map(doc)
  local header_count = 0
  local anchor_map = {}
  local source_counts = {}

  local function rewrite_header(el)
    header_count = header_count + 1
    local new_id = ascii_anchor(header_count)
    local heading_text = pandoc.utils.stringify(el.content)
    local source_key = source_slug(heading_text)
    if source_key ~= "" then
      local count = (source_counts[source_key] or 0) + 1
      source_counts[source_key] = count
      local source_anchor = source_key
      if count > 1 then
        source_anchor = string.format("%s-%d", source_key, count - 1)
      end
      anchor_map[source_anchor] = new_id
    end

    if el.identifier and el.identifier ~= "" then
      anchor_map[el.identifier] = new_id
    end
    el.identifier = new_id
    return el
  end

  doc = doc:walk({
    Header = rewrite_header,
  })

  return doc, anchor_map
end

local function rewrite_links(doc, anchor_map)
  return doc:walk({
    Link = function(el)
      if el.target and el.target:sub(1, 1) == "#" then
        local target = el.target:sub(2)
        local mapped = anchor_map[target]
        if mapped then
          el.target = "#" .. mapped
        end
      end
      return el
    end,
  })
end

function Pandoc(doc)
  local rewritten, anchor_map = build_anchor_map(doc)
  return rewrite_links(rewritten, anchor_map)
end
