'use client';

import ContactInfoCard from "@/app/(public)/contacts/components/ContactInfoCard";
import WorkingHoursCard from "@/app/(public)/contacts/components/WorkingHoursCard";
import MapSection from "@/app/(public)/contacts/components/MapSection";
import {useEffect} from "react";
import {useContactStore} from "@/store/contactsStore";
import ErrorMsg from "@/components/ui/ErrorMsg";
import LoadingFullScreen from "@/components/ui/Loading/LoadingFullScreen";
import {fetchContacts} from "@/actions/contacts";

// interface Props {
//     data: Contact | null;
//     error: string | null;
// }

const ContactsClient = () => {
    const {
        contact,
        setContact,
        setFetchContactError,
        fetchContactLoading,
        setFetchContactLoading,
        fetchContactError
    } = useContactStore();

    useEffect(() => {
        const loadContacts = async () => {
            setFetchContactLoading(true);
            setFetchContactError(null);
            try {
                const data = await fetchContacts();
                setContact(data);
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Неизвестная ошибка при загрузке контактов';
                setFetchContactError(message);
            } finally {
                setFetchContactLoading(false);
            }
        };

       void loadContacts();
    }, [setContact, setFetchContactError, setFetchContactLoading]);

    if (fetchContactLoading) return <LoadingFullScreen/>;
    if (fetchContactError) return <ErrorMsg error={fetchContactError} label='контактов'/>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Контакты</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <ContactInfoCard/>
                <WorkingHoursCard workingHours={contact?.workingHours ?? {}}/>
            </div>
            <MapSection/>
        </div>
    );
};


export default ContactsClient;