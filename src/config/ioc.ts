import { Container } from "inversify";
import getDecorators from "inversify-inject-decorators";

const iocContainer = new Container();
const { lazyInject } = getDecorators(iocContainer);

export { iocContainer, lazyInject };
