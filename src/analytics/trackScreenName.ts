import analytics from '@react-native-firebase/analytics';
import { log } from '@services/Logger';

export const trackScreenName = (name: string | undefined): void => {
    if (name) {
            analytics()
                .logScreenView({
                    screen_name: name,
                    screen_class: name
                })
                .catch((error) => {
                    log.error(error);
                });
    }
}