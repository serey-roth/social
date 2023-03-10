import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { MeDocument, MeQuery, MutationLoginArgs, useLoginMutation } from "../gql/graphql";
import withApollo from "../utils/withApollo";

type fieldTypes = keyof MutationLoginArgs;

export const Login: React.FC<{}> = ({}) => {
    const toast = useToast();
    const router = useRouter();
    const [login] = useLoginMutation();

    const methods = useForm<MutationLoginArgs>();

    const onSubmit: SubmitHandler<MutationLoginArgs> = async (values) => {
        const response = await login({
            variables: values,
            update: (cache, { data: loginData }) => {
                cache.updateQuery<MeQuery>(
                    { query: MeDocument }, 
                    (_) => {
                        return {
                            __typename: "Query",
                            me: loginData?.login.user,
                        }
                    }
                );
                cache.evict({ fieldName: "posts" });
            }
        });
        const loginResponse = response.data?.login;
        if (loginResponse?.errors) {
        loginResponse.errors.forEach((error) => {
            const { field, message } = error;
            methods.setError(
                field as fieldTypes,
                { type: "custom", message },
                { shouldFocus: true }
            );
        });
        } else if (loginResponse?.user) {
            toast({
                position: 'top',
                title: `Welcome back, ${loginResponse.user.username}!`,
                duration: 5000,
                status: 'success',
                isClosable: true,
            });
            if (typeof router.query.next === "string") {
                router.push(router.query.next); //when previous page is not homepage like create-post page
            } else {
                router.push("/"); //client-side navigation to home page
            }
        }
    };

    return (
        <Wrapper variant='small'>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <InputField
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    />
                    <Box mt={4}>
                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="Enter password"
                        />
                    </Box>
                    <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={methods.formState.isSubmitting}
                    type="submit"
                    >
                    Submit
                    </Button>
                </form>
            </FormProvider>
        </Wrapper>
    );
};

export default withApollo({ ssr: false })(Login);