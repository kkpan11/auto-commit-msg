/**
 * Parse an existing commit message.
 *
 * This allows the pieces to be reused in the new message.
 */

/*
 * Split message into prefix and description.
 *
 * Require a colon to exist to detect type prefix. i.e. 'ci' will be considered a description, but
 * 'ci:' will be considered a prefix. This keeps the check simpler as we don't have to match against
 * every type and we don't have to check if we are part of a word e.g. 'circus'.
 *
 * TODO: also support Jira number e.g. '[ABCD-123]', '[ABCD-123] my description', and '[ABCD-123]
 * docs: my description'.
 */
function _splitPrefixDesc(value: string) {
  let prefix: string, description: string;

  if (value.includes(":")) {
    [prefix, description] = value.split(":", 2);
  } else {
    [prefix, description] = ["", value];
  }

  return { prefix, description };
}

/**
 * Split a prefix (before a colon) into a custom prefix and Conventional Commit type prefix.
 */
function _splitPrefixes(value: string) {
  const [customPrefix, typePrefix] = value.includes(" ")
    ? value.split(" ", 2)
    : ["", value];

  return { customPrefix, typePrefix };
}

/**
 * Separate a message prefixs if any and the description.
 */
export function splitMsg(msg: string) {
  const { prefix, description } = _splitPrefixDesc(msg);
  const { customPrefix, typePrefix } = _splitPrefixes(prefix);

  return { customPrefix, typePrefix, description: description.trim() };
}