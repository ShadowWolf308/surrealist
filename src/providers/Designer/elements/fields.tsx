import { Accordion, Checkbox, Flex, Text, TextInput } from "@mantine/core";
import {
	CodeInput,
	FieldKindInput,
	PermissionInput,
} from "~/components/Inputs";
import { useStable } from "~/hooks/stable";
import type { SchemaField } from "~/types";
import { iconJSON } from "~/util/icons";
import { type ElementProps, SectionTitle } from "../helpers";
import { Lister } from "../lister";
import classes from "../style.module.scss";

export function FieldsElement({ data, setData }: ElementProps) {
	const addField = useStable(() => {
		setData((d) => {
			d.fields.push({
				name: "",
				assert: "",
				flex: false,
				readonly: false,
				kind: "",
				value: "",
				default: "",
				permissions: {
					create: true,
					select: true,
					update: true,
					delete: true,
				},
			});
		});
	});

	const removeField = useStable((index: number) => {
		setData((d) => {
			d.fields.splice(index, 1);
		});
	});

	const renderField = useStable((field: SchemaField) => (
		<Flex>
			{field.name}
			{field.kind && (
				<>
					<Text c="slate" mr="xs">
						:
					</Text>
					<Text className={classes.kind}>{field.kind}</Text>
				</>
			)}
		</Flex>
	));

	return (
		<Accordion.Item value="fields">
			<SectionTitle icon={iconJSON}>Fields</SectionTitle>
			<Accordion.Panel>
				<Lister
					value={data.fields}
					missing="No schema fields defined yet"
					name="field"
					onCreate={addField}
					onRemove={removeField}
					display={renderField}
				>
					{(field, i) => (
						<>
							<TextInput
								required
								autoFocus
								label="Field name"
								placeholder="field_name"
								spellCheck={false}
								value={field.name}
								onChange={(e) =>
									setData((draft) => {
										draft.fields[i].name = e.target.value;
									})
								}
							/>
							<Checkbox
								label="Flexible"
								checked={field.flex}
								onChange={(e) =>
									setData((draft) => {
										draft.fields[i].flex = e.target.checked;
									})
								}
							/>
							<Checkbox
								label="Readonly"
								checked={field.readonly}
								onChange={(e) =>
									setData((draft) => {
										draft.fields[i].readonly =
											e.target.checked;
									})
								}
							/>
							<FieldKindInput
								label="Field kind"
								value={field.kind || ""}
								onChange={(value) =>
									setData((draft) => {
										draft.fields[i].kind = value || "";
									})
								}
							/>
							<CodeInput
								label="Field value"
								value={field.value || ""}
								onChange={(value) =>
									setData((draft) => {
										draft.fields[i].value = value;
									})
								}
							/>
							<CodeInput
								label="Field assertion"
								value={field.assert || ""}
								onChange={(value) =>
									setData((draft) => {
										draft.fields[i].assert = value;
									})
								}
							/>
							<CodeInput
								label="Default value"
								value={field.default || ""}
								onChange={(value) =>
									setData((draft) => {
										draft.fields[i].default = value;
									})
								}
							/>
							<PermissionInput
								label="Create access"
								value={field.permissions.create}
								onChange={(value) =>
									setData((draft) => {
										draft.fields[i].permissions.create =
											value;
									})
								}
							/>
							<PermissionInput
								label="Select access"
								value={field.permissions.select}
								onChange={(value) =>
									setData((draft) => {
										draft.fields[i].permissions.select =
											value;
									})
								}
							/>
							<PermissionInput
								label="Update access"
								value={field.permissions.update}
								onChange={(value) =>
									setData((draft) => {
										draft.fields[i].permissions.update =
											value;
									})
								}
							/>
							<PermissionInput
								label="Delete access"
								value={field.permissions.delete}
								onChange={(value) =>
									setData((draft) => {
										draft.fields[i].permissions.delete =
											value;
									})
								}
							/>
						</>
					)}
				</Lister>
			</Accordion.Panel>
		</Accordion.Item>
	);
}
