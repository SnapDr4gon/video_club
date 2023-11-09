const { AbilityBuilder, Ability } = require('@casl/ability');

const userAbilities = (user) => {
    const { can, rules } = AbilityBuilder.extract();

    if (user._permissions[0] === "654b137d1781ef5a46c64c79") {
        can('manage', 'all');
    } else if (user._permissions[0] === "654b139e1781ef5a46c64c7b") {
        can('read', 'all');
    }

    return new Ability(rules);
}

module.exports = userAbilities;