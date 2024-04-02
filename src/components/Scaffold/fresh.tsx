import classes from "./style.module.scss";
import primarySphere from "~/assets/images/primary-sphere.png";
import secondarySphere from "~/assets/images/secondary-sphere.png";
import { Box, Button, Group, Text } from "@mantine/core";
import { SurrealistLogo } from "../SurrealistLogo";
import { useIsLight } from "~/hooks/theme";
import { Icon } from "../Icon";
import { iconPlus, iconSurreal } from "~/util/icons";
import { useInterfaceStore } from "~/stores/interface";
import { useConfigStore } from "~/stores/config";
import { useStable } from "~/hooks/stable";
import { SANDBOX } from "~/constants";

export interface FreshExperienceProps {
	onClickSettings: () => void;
}

export function FreshExperience(props: FreshExperienceProps) {
	const { setActiveConnection } = useConfigStore.getState();
	const { openConnectionCreator } = useInterfaceStore.getState();
	const isLight = useIsLight();

	const openSandbox = useStable(() => {
		setActiveConnection(SANDBOX);
	});

	return (
		<Box
			pos="absolute"
			inset={0}
			className={classes.fresh}
		>
			<div
				className={classes.primarySphere}
				style={{
					backgroundImage: `url(${primarySphere})`
				}}
			/>

			<div
				className={classes.secondarySphere}
				style={{
					backgroundImage: `url(${secondarySphere})`
				}}
			/>

			<SurrealistLogo
				c={isLight ? "white" : "slate.9"}
				className={classes.logo}
			/>

			<Text mb="xl" ta="center" maw={200}>
				Create a new connection or open the sandbox to get started
			</Text>

			<Group mb={38}>
				<Button
					variant="gradient"
					onClick={openConnectionCreator}
					leftSection={
						<Icon path={iconPlus} />
					}
				>
					Create connection
				</Button>
				<Text>
					or
				</Text>
				<Button
					variant="light"
					onClick={openSandbox}
					style={{ border: '1px solid rgba(255, 255, 255, 0.15)'}}
					leftSection={
						<Icon path={iconSurreal} />
					}
				>
					Open the sandbox
				</Button>
			</Group>
		</Box>
	);
}