import { store } from "@/store/store";
// import { Permission } from "@/types/auth";
import { ExtractSubjectType, PureAbility, Subject, SubjectRawRule, defineAbility, subject } from "@casl/ability";

const ability = new PureAbility([{ action: '', subject: '' }]);

store.subscribe(() => {
  let auth = store.getState().auth;
  defineRulesFor(auth.permissions);
});

const defineRulesFor = (permissions: string[]) => {
  const tmp_abilities: SubjectRawRule<string, ExtractSubjectType<Subject>, unknown>[] | { action: string; subject: string; }[] = [];
  permissions.map((permission: string) => {
    tmp_abilities.push({
      action: permission, subject: 'admin'
    });
  })
  ability.update(tmp_abilities);
}

export default ability;