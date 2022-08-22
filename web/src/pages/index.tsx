import { useRouter } from "next/router";
import { useEffect } from "react";

const TopPage = () => {
	const router = useRouter();

	useEffect(() => {
	router.push('/scraps');
	}, [router]);

	return null;
};


export default TopPage;