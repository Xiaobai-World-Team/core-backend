import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from './store.controller';

describe('StoreController', () => {
  let controller: StoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreController],
    }).compile();

    controller = module.get<StoreController>(StoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('must end with git', async () => {

    controller.addGitRegistry({
      gitRegistry: 'https://www.111.com'
    }).catch(e => {
      expect((e)).toThrowError('must end with git')
    })
  })
});
